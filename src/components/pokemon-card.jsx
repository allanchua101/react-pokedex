import React from 'react';

class PokemonCard extends React.Component {
    render() {
        return (
            <div className='pokemon-card'>
                <img src="/images/thm/001Bulbasaur.png" class="avatar" />
                <p class='cardname'>001 - Bulbasaur</p>
            </div>
        );
    }
}

export default PokemonCard;