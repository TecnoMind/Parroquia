import * as fs from 'fs';
import * as path from 'path';

import {Database} from 'sqlite3';
import {Settings} from './settings';


export interface IDbResult {
    changes: number;
    lastID: number;
}

/**
 * TheDb is a Promise-ified wrapper around bare sqlite3 API.
 *
 * @export
 * @class TheDb
 */

export abstract class Repository<T> {
    private  readonly version = 1;
    private  db: Database;
    private table :string;

    constructor(type : new () => T) {
        this.table = type.name.toLowerCase();
    }

    public selectOne( id: number): Promise<T> {
        const sql = 'SELECT * FROM $table WHERE id = $id';
        const values = { $id: id, $table: this.table };

        return new Promise<T>((resolve, reject) => {
            this.db.get(sql, values, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    public selectAll(): Promise<Array<{}>> {

        const sql = `SELECT * FROM $table`;
        const values = {$table: this.table};

        return new Promise<Array<{}>>((resolve, reject) => {
            this.db.all(sql, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public insert(object: any, values: {}): Promise<IDbResult> {

        let arrayFields = Object.getOwnPropertyNames(object);
        let sql = 'INSERT INTO $table (';
        arrayFields.forEach( field => {
            sql += field + ','
        });

        sql = sql.substring(0, sql.length - 2) + ') VALUES()';

       /* for(let field: arrayFields) {
            const sql
        }*/

        return this.change(sql, values);
    }

    public update(sql: string, values: {}): Promise<IDbResult> {
        return this.change(sql, values);
    }

    public delete(sql: string, values: {}): Promise<IDbResult> {
        return this.change(sql, values);
    }

    public query(sql: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sql, {}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public beginTxn(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run('BEGIN', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public commitTxn(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run('COMMIT', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public rollbackTxn(reason: Error): Promise<void> {
        return new Promise<void>((_resolve, reject) => {
            console.log('Rollback transaction');
            this.db.run('ROLLBACK', (err) => {
                if (err) {
                    console.log(err);
                    reject(new Error('Unforeseen error occurred. Please restart the application'));
                } else {
                    reject(reason);
                }
            });
        });
    }

    public importJson(filename: string, disableForeignKeys: boolean): Promise<void> {
        const data: { version: number, tables: { [key: string]: Array<{}> } } = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const tableNames = Object.keys(data.tables);
        const deletes: Array<Promise<IDbResult>> = [];
        const inserts: Array<Promise<IDbResult>> = [];

        let foreignKeys: boolean;

        return TheDb.getPragmaForeignKeys()
            .then((value) => {
                foreignKeys = value;
                if (foreignKeys === !disableForeignKeys) {
                    return Promise.resolve();
                } else {
                    return TheDb.setPragmaForeignKeys(!disableForeignKeys);
                }
            })
            .then(TheDb.beginTxn)
            .then(() => {
                for (const table of tableNames) {
                    deletes.push(TheDb.delete(`DELETE FROM ${table}`, {}));
                }
                return Promise.all(deletes);
            })
            .then(() => {
                for (const tableName of tableNames) {
                    if (data.tables[tableName].length === 0) {
                        continue;
                    }
                    const columnNames = Object.keys(data.tables[tableName][0]);

                    for (const row of data.tables[tableName]) {
                        let sql = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES\n`;
                        const values: Array<number | string | null> = [];
                        for (const name of columnNames) {
                            values.push(row[name]);
                        }
                        sql += `(${Array(columnNames.length + 1).join('?, ').slice(0, -2)})`;
                        inserts.push(TheDb.insert(sql, values));
                    }
                }
                return Promise.all(inserts);
            })
            .then(this.commitTxn)
            .catch(this.rollbackTxn)
            .then(() => {
                if (foreignKeys === !disableForeignKeys) {
                    return Promise.resolve();
                } else {
                    return this.setPragmaForeignKeys(foreignKeys);
                }
            });
    }

    public static exportJson(filename: string): Promise<void> {
        const data = {
            version: TheDb.version,
            tables: {},
        };

        return this.selectAll(`SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name`, {})
            .then((rows) => {
                const selects: Array<Promise<Array<{}>>> = [];
                for (const row of rows) {
                    selects.push(
                        this.db.selectAll(`SELECT * FROM ${row['name']}`, {})
                            .then((results) => {
                                return data.tables[row['name']] = results;
                            }),
                    );
                }
                return Promise.all(selects);
            })
            .then(() => {
                fs.writeFileSync(filename, JSON.stringify(data, undefined, 4));
            });
    }


    public createDb(dbPath: string): Promise<string> {
        dbPath += path.extname(dbPath) === '.db' ? '' : '.db';

        console.log('Creating  databae: ', dbPath);

        const dataPath = path.join(Settings.dbFolder, `database.init.json`);
        const schemaPath = path.join(Settings.dbFolder, `database.db.sql`);
        const schema = fs.readFileSync(schemaPath, { encoding: 'utf8' });

        // Create data directory in userdata folder
        if (!fs.existsSync(path.join(dbPath, '..'))) {
            fs.mkdirSync(path.join(dbPath, '..'));
        }

        return TheDb.getDb(dbPath)
            .then(() => this.exec(schema))
            .then(() => TheDb.setPragmaForeignKeys(true))
            .then(() => TheDb.importJson(dataPath, false))
            .then(TheDb.setPragmaVersion)
            .then(() => {
                console.log('Database created.');
                return dbPath;
            });
    }

    public openDb(dbPath: string): Promise<void> {
        console.log('Opening database: ', dbPath);
        return TheDb.getDb(dbPath)
            .then(() => TheDb.setPragmaForeignKeys(true))
            .then(TheDb.upgradeDb)
            .then(() => {
                console.log('Database opened');
                return Promise.resolve();
            });
    }

    public closeDb(): Promise<void> {
        if (!TheDb.db) {
            return Promise.resolve();
        }
        return new Promise<void>((resolve, reject) => {
            TheDb.db.close((err) => {
                console.log('Closing current Db');
                if (err) {
                    reject(err);
                    console.log('Db not closed');
                } else {
                    resolve();
                }
            });
        });
    }

    private getDb(dbPath: string): Promise<void> {
        return TheDb.closeDb()
            .then(() => {
                return new Promise<void>((resolve, reject) => {
                    const db = new Database(dbPath, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            TheDb.db = db;
                            resolve();
                        }
                    });
                });
            });
    }

    private upgradeDb(): Promise<void> {
        return TheDb.getPragmaVersion()
            .then((version) => {
                if (version === TheDb.version) {
                    return Promise.resolve();
                } else if (version > TheDb.version) {
                    throw new Error(`Cannot downgrade database from version ${version} to ${TheDb.version}.`);
                } else {
                    return new Promise<void>((resolve, reject) => {
                        switch (version) {
                            case 0:
                                // Upgrade schema if needed
                                // Upgrade data if needed
                                break;
                            default:
                                reject(new Error(`No upgrade defined for database version ${version}`));
                        }
                        resolve();
                    });
                }
            })
            .then(TheDb.setPragmaVersion);

    }

    private change(sql: string, values: {}): Promise<IDbResult> {
        return new Promise<IDbResult>((resolve, reject) => {
            this.db.run(sql, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes, lastID: this.lastID });
                }
            });
        });
    }

    private exec(sql: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private getPragmaForeignKeys(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            TheDb.db.get('PRAGMA foreign_keys', (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Boolean(row['foreign_keys']));
                }
            });
        });
    }

    private PragmaForeignKeys(value: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            TheDb.db.run(`PRAGMA foreign_keys = ${value}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`PRAGMA foreign_keys = ${value}`);
                    resolve();
                }
            });
        });
    }

    private getPragmaVersion(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            TheDb.db.get('PRAGMA user_version', (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Number(row['user_version']));
                }
            });
        });
    }

    private setPragmaVersion(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            TheDb.db.run(`PRAGMA user_version = ${TheDb.version}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`PRAGMA version = ${TheDb.version}`);
                    resolve();
                }
            });
        });
    }
}
