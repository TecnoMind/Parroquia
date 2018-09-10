import {TheDb} from '../../../db/repository';
import {User} from "../model/user.model";
import {Injectable} from "@angular/core";
/**
 * Simple class for selecting, inserting, updating and deleting Heroes in hero table.
 *
 * @export
 * @class Hero
 */
@Injectable()
export class UserService {

    private factory: TheDb = new TheDb(User.name.toLowerCase());

    public get(id: number): Promise<User> {
        return this.factory.selectOne(id)
            .then((row) => {
                if (row) {
                    return this.fromRow(row);
                } else {
                    throw new Error('Expected to find 1 User. Found 0.');
                }
            });
    }

    public getAll(): Promise<User[]> {

        return this.factory.selectAll()
            .then((rows) => {
                const user: User[] = [];
                for (const row of rows) {
                    const hero = this.fromRow(row);
                    user.push(hero);
                }
                return user;
            });
    }

    public insert(user: User): Promise<void> {


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

    public fromRow(row: object): User {
        return new User(row['id'], row['name'], row['lastName'], row['password']);

    }
}