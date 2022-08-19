export function groupBySingleField(data:any, field:string){
    return data.reduce((acc:any, val:any) => {
        const rest = Object.keys(val).reduce((newObj:any, key:string) => {
            if(key !== field){
                newObj[key] = val[key]
            }
            return newObj;
        }, {});
        if (acc[val[field]]) {
            acc[val[field]].push(rest);
        } else {;
            acc[val[field]] = [rest];
        }
        return acc;
    }, {})
}