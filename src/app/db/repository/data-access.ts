import {IDbResult} from "./result";

export interface DataAccess {
    query(sql: string): Promise<void>;
    beginTxn(): Promise<void>;
    commitTxn(): Promise<void>;
    rollbackTxn(reason: Error): Promise<void>
    createDb(dbPath: string): Promise<string>
    openDb(dbPath: string): Promise<void>
    closeDb(): Promise<void>;
    getDb(dbPath: string): Promise<void>;
    upgradeDb(): Promise<void>;
    change(sql: string, values: {}): Promise<IDbResult>;
    exec(sql: string): Promise<void>;
    getPragmaForeignKeys(): Promise<boolean>;
    setPragmaForeignKeys(value: boolean): Promise<void>;
    getPragmaVersion(): Promise<number>;
    setPragmaVersion(): Promise<void>;
}