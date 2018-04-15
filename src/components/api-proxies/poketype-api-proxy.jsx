import React from 'react';

class PokeTypeApiProxy {
    loadData(callback) {
        fetch('/data/types.json')
            .then(results => {
                return results.json();
            })
            .then(callback);
    }
}

export default PokeTypeApiProxy;