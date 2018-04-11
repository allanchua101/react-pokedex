import React from 'react';

class PokemonCard extends React.Component {
    render() {
        return (
            <div className='pokemon-card'>
                <img src='/images/thm/002Ivysaur.png' class='avatar' />
                <div class='info-panel'>
                    <p class='cardname'>001 - Bulbasaur</p>
                </div>
            </div>
        );
    }
}

export default PokemonCard;