import React from 'react';
import SideNav from './side-navigation-bar.jsx';
import PokemonCardFactory from './pokemon-card-factory.jsx';
import PokePagerControl from './poke-pager-control.jsx';
import PokemonApiProxy from '../api-proxies/pokemon-api-proxy.jsx';


class MainPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            visiblePokemons: [],
            pageSize: 15,
            totalPages: 0,
            page: 1
        };
    }
    componentDidMount() {
        /* Transfer this to service abstraction later */
        if (this.state.pokemons.length === 0) {
            var apiProxy = new PokemonApiProxy();

            apiProxy.loadData(data => {
                let pageSize = this.state.pageSize;
                let pageOffset = ((this.state.page - 1) * pageSize);
                let lastItemIndex = (pageOffset + pageSize);
                const dataClone = data;

                this.setState({
                    pokemons: data,
                    visiblePokemons: dataClone.slice(pageOffset, lastItemIndex),
                    totalPages: (data.length / pageSize)
                })
            });
        }
    }
    render() {
        return (
            <div>
                <SideNav />
                <h1 id='page-title'>POKEDEX</h1>
                <div className='clearfix'></div>
                <PokemonCardFactory pokemons={this.state.visiblePokemons} />
                <div className='clearfix'></div>
                <PokePagerControl currentPage={this.state.page}
                    totalPages={this.state.totalPages}
                    pageSize={this.state.pageSize} />
                <div className='clearfix'></div>
            </div>
        );
    }
}

export default MainPanel;