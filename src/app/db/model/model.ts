export class Model {
    public toArray(): Array<string> {
        let keys = Object.keys(this);
        let result = Array<string>();
        for(let i = 0; i < keys.length; i++ ){
            result.push(keys[i].replace("_", ""));
        }

        return result;
    }

    public toValues(array: Array<string>) {
        let rv = {};
        array.forEach(value => {
            rv['$' + value] =  this[value];
        });
        return rv;
    }

}