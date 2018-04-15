export default class FilterByIdQuery {
    execute(data, id) {
        let output = [];

        if (id) {
            for (let i = 0, len = data.length; i < len; i++) {
                const item = data[i];
    
                if (item.id === id)
                    output.push(item);
            }
        } else {
            output = data;
        }
    
        return output;
    }
}