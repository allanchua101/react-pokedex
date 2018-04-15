export default class FilterByPokeTypeQuery {
    execute(data, types, type) {
        let output = [];
        
        if(type) {
            let searchQuery = type.toLowerCase();

            for(let i = 0, len = data.length; i < len; i++) {
                let item = data[i];
                console.log(item);

                if(item.type) {
                    for(let t = 0, tlen = item.type.length; t < tlen; t++) {
                        let type = item.type[t];

                        if(type.toLowerCase().indexOf(searchQuery) > -1) {
                            output.push(item);
                            break;
                        }
                    }
                }
            }
        } else {
            output = data;
        }

        console.log(output);

        return output;
    }
};
