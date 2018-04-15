export default class FilterByNameQuery {
    execute(data, name) {
        let output = [];

        if (name) {
            let smallCapsName = (name).toLowerCase();
    
            for (let i = 0, len = data.length; i < len; i++) {
                const item = data[i];
    
                if (item.ename.toLowerCase().indexOf(smallCapsName) > -1)
                    output.push(item);
            }
        } else {
            output = data;
        }
    
        return output;
    }
}