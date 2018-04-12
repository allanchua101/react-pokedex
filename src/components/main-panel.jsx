import React from 'react';
import SideNav from './side-navigation-bar.jsx';
import PokemonCardFactory from './pokemon-card-factory.jsx';

class MainPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            visiblePokemons: [],
            pageSize: 20,
            page: 1
        };
    }
    componentDidMount() {
        if (this.state.pokemons.length === 0) {
            fetch('/data/pokedex.json')
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    let pageOffset = ((this.state.page - 1) * this.state.pageSize);
                    let lastItemIndex = (pageOffset + this.state.pageSize);
                    let dataClone = JSON.parse(JSON.stringify(data));
                    
                    this.setState({ 
                        pokemons: data,
                        visiblePokemons: dataClone.slice(pageOffset, lastItemIndex)
                    })
                });
        }
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