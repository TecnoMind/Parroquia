export interface IDdl<T> {

    findAll(): Promise<Array<T>> ;
    findOne(id: number): Promise<T>;
 //   findOneBy(field: Array<string>, values: Array<string>): T;
}