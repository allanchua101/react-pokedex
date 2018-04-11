import React from 'react';
import SideNav from './side-navigation-bar.jsx';
import PokemonCard from './pokemon-card.jsx';

class MainPanel extends React.Component {
    render() {
        return (
            <div>
                <SideNav />
                <h1 id='page-title'>Pokedex</h1>
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />
                <PokemonCard />                
                <PokemonCard />                
                <PokemonCard />                
                <PokemonCard />                
                <PokemonCard />                
                <PokemonCard />                
                <PokemonCard />                
                <div class="clearfix"></div>
            </div>
        );
    }
}

export default MainPanel;