
interface JsonToEntity <T> {
    oneFromRow(json: object): T;
    listFromRow(list:Array<object>): Array<T>;
}