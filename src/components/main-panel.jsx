import React from 'react';
import SideNav from './side-navigation-bar.jsx';
import PokemonCardFactory from './pokemon-card-factory.jsx';

class MainPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            visiblePokemons: [{
                ename: 'Bulbasaur',
                id: '001',
            }, {
                ename: 'Ivysaur',
                id: '002',
            }],
            loaded: false
        };
    }
    render() {
        return (
            <div>
                <SideNav />
                <h1 id='page-title'>Pokedex</h1>
                <PokemonCardFactory pokemons={this.state.visiblePokemons} />
                <div className='clearfix'></div>
            </div>
        );
    }
}

export default MainPanel;