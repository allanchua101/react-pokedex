import React from 'react';

class SearchBox extends React.Component {
    render() {
        return (
            <input className='search-box' 
                   placeholder='Type to search pokemons by name'/>
        );
    }
}

export default SearchBox;