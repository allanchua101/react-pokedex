import React from 'react';

class PokemonApiProxy {
    loadData(callback) {
        fetch('/data/pokedex.json')
            .then(results => {
                return results.json();
            })
            .then(callback);
    }
}

export default PokemonApiProxy;