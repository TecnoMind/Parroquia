import {DataAccess} from "../data-access";
import * as fs from 'fs';
import * as path from 'path';

import {Database} from 'sqlite3';

import {IDbResult} from "../result";
import {SettingsImpl} from "./settings.impl";

export class DataAccessImpl implements DataAccess {
    private  readonly version = 1;
    protected  db: Database;

    constructor(protected settings: SettingsImpl) {
   //     db = new Database()
    }

    beginTxn(): Promise<void> {
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

    change(sql: string, values: {}): Promise<IDbResult> {
        return new Promise<IDbResult>((resolve, reject) => {
            console.log(sql);
            this.db.run(sql, values, function (err) {
                if (err) {
                    console.log(sql);

                    reject(err);
                } else {
                    resolve({ changes: this.changes, lastID: this.lastID });
                }
            });
        });
    }

    closeDb(): Promise<void> {
        if (!this.db) {
            return Promise.resolve();
        }
        return new Promise<void>((resolve, reject) => {
            this.db.close((err) => {
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

    commitTxn(): Promise<void> {
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

    createDb(dbPath: string): Promise<string> {
        dbPath += path.extname(dbPath) === '.db' ? '' : '.db';

        console.log('Creating  databae: ', dbPath);

        const schemaPath = path.join(this.settings.dbFolder, `database.db.sql`);
        const schema = fs.readFileSync(schemaPath, { encoding: 'utf8' });

        // Create data directory in userdata folder
        if (!fs.existsSync(path.join(dbPath, '..'))) {
            fs.mkdirSync(path.join(dbPath, '..'));
        }

        return this.getDb(dbPath)
            .then(() => this.exec(schema))
            .then(() => this.setPragmaForeignKeys(true))
            .then(() => {
                console.log('Database created.');
                return dbPath;
            });
    }

    exec(sql: string): Promise<void> {
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



    getDb(dbPath: string): Promise<void> {
        return this.closeDb()
            .then(() => {
                return new Promise<void>((resolve, reject) => {
                    const db = new Database(dbPath, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            this.db = db;
                            resolve();
                        }
                    });
                });
            });
    }

    getPragmaForeignKeys(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.get('PRAGMA foreign_keys', (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Boolean(row['foreign_keys']));
                }
            });
        });
    }

    getPragmaVersion(): Promise<number> {
        console.log(this.db);
        return new Promise<number>((resolve, reject) => {
            this.db.get('PRAGMA user_version', (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Number(row['user_version']));
                }
            });
        });
    }

    openDb(dbPath: string): Promise<void> {
        console.log('Opening database: ', dbPath);
        return this.getDb(dbPath)
            .then(() => this.setPragmaForeignKeys(true))

            .then(() => {
                console.log('Database opened');
                return Promise.resolve();
            });
    }

    query(sql: string): Promise<void> {
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

    rollbackTxn(reason: Error): Promise<void> {
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

    setPragmaForeignKeys(value: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(`PRAGMA foreign_keys = ${value}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`PRAGMA foreign_keys = ${value}`);
                    resolve();
                }
            });
        });
    }

    setPragmaVersion(): Promise<void> {

        return new Promise<void>((resolve, reject) => {
            console.log(this.db);
            this.db.run(`PRAGMA user_version = ${this.version}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`PRAGMA version = ${this.version}`);
                    resolve();
                }
            });
        });
    }

    upgradeDb(): Promise<void> {
        return this.getPragmaVersion()
            .then((version) => {
                if (version === this.version) {
                    return Promise.resolve();
                } else if (version > this.version) {
                    throw new Error(`Cannot downgrade database from version ${version} to ${this.version}.`);
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
            .then(this.setPragmaVersion);
    }


}