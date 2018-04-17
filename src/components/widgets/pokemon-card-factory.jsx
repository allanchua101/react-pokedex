import React from 'react';
import PokemonCard from './pokemon-card.jsx';
import MessagingTopic from '../pubsub/messaging-topic.jsx';

class PokemonCardFactory extends React.Component {
    constructor() {
        super();
        let instance = this;
        this.state  = {
            visiblePokeCardId: '000',
            mode: 'SHOW ALL'
        };
        this.pokemonCardBus =  new MessagingTopic();
        this.pokemonCardBus.subscribe(msg => {
            instance.setState({
                visiblePokeCardId: msg.originId,
                mode: msg.event
            });
        });
    }
    render() {
        let { pokemons } = this.props;
        let visibleItems = pokemons.map((pokemon) => {
            return <PokemonCard key={pokemon.id} data={pokemon} messageBus={this.pokemonCardBus}
                                isVisible={this.state.mode === 'SHOW ALL' || (pokemon.id === this.state.visiblePokeCardId)}
                                isExpanded={this.state.mode !== 'SHOW ALL' && (pokemon.id === this.state.visiblePokeCardId)}/>;
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