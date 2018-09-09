import {TheDb} from '../../../db/thedb';
import {User} from "../model/hero.model";

/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
export class UserService {

    public static get(id: number): Promise<User> {
        const sql = 'SELECT * FROM user WHERE id = $id';
        const values = { $id: id };

        return TheDb.selectOne(sql, values)
            .then((row) => {
                if (row) {
                    return this.fromRow(row);
                } else {
                    throw new Error('Expected to find 1 User. Found 0.');
                }
            });
    }

    public static getAll(): Promise<User[]> {
        const sql = `SELECT * FROM user ORDER BY name`;
        const values = {};

        return TheDb.selectAll(sql, values)
            .then((rows) => {
                const heroes: User[] = [];
                for (const row of rows) {
                    const hero = this.fromRow(row);
                    heroes.push(hero);
                }
                return heroes;
            });
    }

    public insert(user: User): Promise<void> {
        const sql = `
            INSERT INTO user (name, last_name, password)
            VALUES($name, $lastName, $password)`;

        const values = {
            $name: user.name,
            $lastName: user.lastName,
            $password: user.password
        };

        return TheDb.insert(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 Hero to be inserted. Was ${result.changes}`);
                } else {
                    user.id = result.lastID;
                }
            });
    }

    public update(user: User): Promise<void> {
        const sql = `
            UPDATE user
               SET name = $name,
               last_name = $lsatName
             WHERE id = $id`;

        const values = {
            $name: user.name,
            $lastName: user.lastName
        };

        return TheDb.update(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 User to be updated. Was ${result.changes}`);
                }
            });
    }

    public delete(id: number): Promise<void> {
        const sql = `
            DELETE FROM user WHERE id = $id`;

        const values = {
            $id: id,
        };

        return TheDb.delete(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 Hero to be deleted. Was ${result.changes}`);
                }
            });
    }

    public static fromRow(row: object): User {
        return new User(row['id'], row['name'], row['lastName'], row['password']);

    }
}