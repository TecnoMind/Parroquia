import {ICrud} from "../crud";
import {IDdl} from "../ddl";
import {DataAccessImpl} from "./data-access.impl";
import {SettingsImpl} from "./settings.impl";
import {Model} from "../../model/model";

/**
 * TheDb is a Promise-ified wrapper around bare sqlite3 API.
 *
 * @export
 * @class TheDb
 */

export class Repository<T extends Model> extends DataAccessImpl implements ICrud<T>, IDdl<T>, JsonToEntity<T> {

    private readonly __table: string;

    constructor(table : string , public settings: SettingsImpl) {
        super(settings);
        this.__table = table.split(/(?=[A-Z])/).join('_').toLowerCase();
    }


    deleteOne(id: number): void {

        // @ts-ignore
        this.findOne(id).then( entity  => {
            let sql = 'UPDATE ' + this.__table + ' SET deleted = $delete WHERE  id = $id';
            const values = {$id : id, $delete: 1 };
             this.change(sql, values).then((result) => {
                if (result.changes !== 1) {
                    throw new Error('Expected 1' + this.__table+ 'to be inserted. Was ${result.changes}');
                }
            });
        }).catch(error  => {
            console.log(error);
        });
    }

    findAll(): Promise<Array<T>> {
        const sql = 'SELECT * FROM ' + this.__table + ' WHERE deleted = $deleted';
        const values = { $deleted: 0 };
        console.log(sql);
        return new Promise<Array<T>>((resolve, reject) => {
            this.db.all(sql, values, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    findOne(id: number): Promise<T> {
        let sql = 'SELECT * FROM ' +  this.__table + ' WHERE id = $id AND deleted = $deleted';
        let values = { $id: id, $deleted: 0};

        return new Promise<T>((resolve, reject) => {
            this.db.get(sql, values, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve( this.oneFromRow(row));
                }
            });
        });
    }

    save(entity: T ): Promise<void> {
        let fields = entity.toArray();
        let values = entity.toValues(fields);
        let sql = 'INSERT INTO ' + this.__table + ' ( ' + this.getFields(fields, '') + ' )'
          + ' VALUES( ' + this.getFields(fields, '$') + ' )';

        return this.change(sql, values).then((result) => {
             if (result.changes !== 1) {
                  throw new Error('Expected 1' + this.__table+ 'to be inserted. Was ${result.changes}');
            }
        });

    }

    update(entity: T): Promise<void> {
     //   console.log(entity);
        let fields = entity.toArray();
        let values = entity.toValues(fields);
        let sql = 'UPDATE ' + this.__table + ' SET ' + this.getClause(fields, '$',',')
            + 'WHERE id = $id';

        return this.change(sql, values).then((result) => {
            if (result.changes !== 1) {
                throw new Error('Expected 1' + this.__table+ 'to be inserted. Was ${result.changes}');
            }
        });

    }


    listFromRow(list: Array<object> ): Array<T> {
        let entities = new Array<T>();

        list.forEach( entity => {
            entities.push(this.oneFromRow( entity))
        });
        return entities;
    }

    oneFromRow(json: object): T {
        return <T> JSON.parse( JSON.stringify(json));
    }

    findOneBy(entity: T): Promise<T> {
        let sql = 'SELECT * FROM ' +  this.__table + ' WHERE ';
        let fields = entity.toArray();
        let values = entity.toValues(fields);

        sql += this.getClause(fields, '$','AND');
        console.log(sql);
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

    private getClause(fields: Array<string>, firstJoint: string, secondJoint: string) {
        let where  = '';
        fields.forEach(field =>{
            if(field !== 'id') {
                where += field + ' = ' + firstJoint + field + ' ' + secondJoint + ' ';
            }

        });
        return where.substring(0, where.length - (secondJoint.length + 1));
    }

    private getFields(fields: Array<string>, joint: string): string{
        let statement = '';
        fields.forEach(field => {
            statement += joint + field + ',';
        });

        return statement.substring(0, statement.length - 1 );
    }

}
