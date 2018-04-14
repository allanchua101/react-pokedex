import React from 'react';
import SideNav from './side-navigation-bar.jsx';
import PokemonCardFactory from './pokemon-card-factory.jsx';
import PokePagerControl from './poke-pager-control.jsx';
import PokemonApiProxy from '../api-proxies/pokemon-api-proxy.jsx';
import PagingTopic from '../pubsub/paging-topic.jsx';

function buildPagingTopic(instance) {
    return instance.pagingTopic
                   .messages()
                   .subscribe(msg => {
                       var nextState = getPaginatedState(instance.state.pageSize, msg.value, instance.pokemons);
                       
                       instance.setState(nextState);
                    });
}

function getPaginatedState(pageSize, page, data) {
    let pageOffset = ((page - 1) * pageSize);
    let lastItemIndex = (pageOffset + pageSize);
    const dataClone = data;

    return {
        page: page,
        visiblePokemons: dataClone.slice(pageOffset, lastItemIndex),
        totalPages: Math.ceil(data.length / pageSize)
    };
}

class MainPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            visiblePokemons: [],
            pageSize: 15,
            totalPages: 0,
            page: 1
        };
        this.pokemons = [];
        this.pagingTopic = new PagingTopic();
        this.subscription = buildPagingTopic(this);
    }
    componentDidMount() {
        /* Transfer this to service abstraction later */
        if (this.pokemons.length === 0) {
            var apiProxy = new PokemonApiProxy();

            apiProxy.loadData(data => {
                let nextState = getPaginatedState(this.state.pageSize, this.state.page, data);

                this.pokemons = data;
                this.setState(nextState);
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
                                  pagingTopic={this.pagingTopic}
                                  pageSize={this.state.pageSize} />
                <div className='clearfix'></div>
            </div>
        );
    }
}

export default MainPanel;