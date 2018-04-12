import React from 'react';
import PokemonCard from './pokemon-card.jsx';

class PokemonCardFactory extends React.Component {
    render() {
        let { pokemons } = this.props;
        let visibleItems = pokemons.map((pokemon) => {
            return <PokemonCard data={pokemon} />;
        });

        return (
            <div class='pokemon-list'>
                {visibleItems}
            </div>
        );
    }
}

export default PokemonCardFactory;
