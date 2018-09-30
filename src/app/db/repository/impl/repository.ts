import {ICrud} from "../crud";
import {IDdl} from "../ddl";
import {DataAccessImpl} from "./data-access.impl";
import {SettingsImpl} from "./settings.impl";

/**
 * TheDb is a Promise-ified wrapper around bare sqlite3 API.
 *
 * @export
 * @class TheDb
 */

export class Repository<T> extends DataAccessImpl implements ICrud<T>, IDdl<T>, JsonToEntity<T> {

    private readonly __table: string;

    constructor(table : string , public settings: SettingsImpl) {
        super(settings);
        this.__table = table;
        console.log(table)
       // console.log(this.__table);

    }

    deleteOne(entity: T): void {
        console.log(entity);
        return undefined;

    }

    findAll(): Promise<Array<T>> {
        const sql = 'SELECT * FROM ' + this.__table;
        console.log(sql);
        const values = { };
        console.log(this.db);
        return new Promise<Array<T>>((resolve, reject) => {
            this.db.all(sql, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    findOne(id: number): Promise<T> {
        let sql = 'SELECT * FROM ' +  this.__table + ' WHERE id = $id';
        let values = { $id: id};

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

    findOneBy(fields: Array<string>, values: any):  Promise<T> {
        let sql = 'SELECT * FROM ' +  this.__table + ' WHERE ';
        let where  = '';
        fields.forEach(field =>{
            where += field + ' = ' + '$' + field + ' AND ';
        });
        sql += where.substring(0, where.length - 4);
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

    save(entity: T): Promise<void> {
      let fields = Object.getOwnPropertyNames(entity);
      let fieldsName = '';
      let values = '';
      fields.forEach(field => {
          fieldsName += field + ',';
          values += '$' + field + ',';
      });

      fieldsName = fieldsName.substring(0, fieldsName.length -2);

      const sql = 'INSERT INTO hero (' + fieldsName + ') VALUES('+ values +')';
      return this.change(sql, values).then((result) => {
          if (result.changes !== 1) {
              throw new Error('Expected 1' + this.__table+ 'to be inserted. Was ${result.changes}');
          } else {
             // this.id = result.lastID;
          }
      });

    }

    update(entity: T): void {
        console.log(entity);

        return undefined;

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



}
