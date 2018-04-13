import React from 'react';
import PokemonCard from './pokemon-card.jsx';

class PokemonCardFactory extends React.Component {
    render() {
        let { pokemons } = this.props;
        let visibleItems = pokemons.map((pokemon) => {
            return <PokemonCard key={pokemon.id} data={pokemon} />;
        });

        return (
            <div className='pokemon-list'>
                {visibleItems}
                <div className='clearfix'></div>
            </div>
        );
    }
}

export default PokemonCardFactory;