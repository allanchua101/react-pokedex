function ascending(a, b) {
    var textA = a.enlishType.toUpperCase();
    var textB = b.enlishType.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

function attachPokeType(pokemon, pokeTypes) {
    pokemon.enlishType = getFirstEnglishType(pokemon, pokeTypes);
}

function attachTypes(pokemons, pokeTypes) {
    for(let i = 0, len = pokemons.length; i  < len; i++) {
        attachPokeType(pokemons[i], pokeTypes);
    }
}

function descending(a, b) {
    var textA = a.enlishType.toUpperCase();
    var textB = b.enlishType.toUpperCase();
    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
}

function getFirstEnglishType(pokemon, poketypes) {
    var output = [];

    for(let i = 0, len = poketypes.length; i < len; i++) {
        let test = JSON.stringify(poketypes[i]);

        for(let t = 0, tlen = pokemon.type.length; t < tlen; t++) {
            if(test.indexOf(pokemon.type[t]) > -1) {
                return poketypes[i].ename;
            }
        }
    }

    return output;
}

export default class SortByType {
    execute(data, pokeTypes, sortDirection='Ascending') {
        const dataClone = data;

        attachTypes(dataClone, pokeTypes);

        return dataClone.sort(sortDirection === 'Ascending' ? ascending : descending);
    }
}