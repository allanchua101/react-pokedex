import React from 'react';
import SideNav from './side-navigation-bar.jsx';
import PokemonCardFactory from './pokemon-card-factory.jsx';
import PokePagerControl from './poke-pager-control.jsx';
import SearchBox from './search-box.jsx';
import PokemonApiProxy from '../api-proxies/pokemon-api-proxy.jsx';
import MessagingTopic from '../pubsub/messaging-topic.jsx';
import PaginationUtility from '../utils/pagination-utility.jsx';
// Queries
import FilterByNameQuery from '../isomorphic-queries/filter-by-name-query.jsx';
import FilterByPokeTypeQuery from '../isomorphic-queries/filter-by-poketype-query.jsx';
import FilterByIdQuery from '../isomorphic-queries/filter-by-id-query.jsx';

let DEFAULT_PAGE = 1;

function buildTopic(callback) {
    var topic = new MessagingTopic();

    topic.subscribe(callback);

    return topic;
}

function getNextState(instance, searchQuery, page, filter) {
    let pokemons = instance.pokemons;
    
    console.log(filter);

    pokemons = (new FilterByIdQuery()).execute(pokemons, filter.idQuery)
    pokemons = (new FilterByNameQuery()).execute(pokemons, searchQuery);
    pokemons = (new FilterByPokeTypeQuery()).execute(pokemons, instance.types, filter.typeQuery);

    return (new PaginationUtility()).execute(instance.state.pageSize, page, pokemons);
}

function handleFilterMessages(instance) {
    return buildTopic(msg => {
        let nextState = getNextState(instance, instance.state.searchQuery, DEFAULT_PAGE, msg);

        nextState.nameQuery = msg.nameQuery;
        nextState.idQuery = msg.idQuery;
        nextState.typeQuery = msg.typeQuery;
        instance.setState(nextState);
    });
}

function handleSearchMessages(instance) {
    return buildTopic(msg => {
        let nextState = getNextState(instance, msg, DEFAULT_PAGE, instance.state);

        nextState.searchQuery = msg;
        instance.setState(nextState);
    });
}

function handlePagingMessages(instance) {
    return buildTopic(msg => {
        let nextState = getNextState(instance, instance.state.searchQuery, msg.value, instance.state);

        instance.setState(nextState);
    });
}

class MainPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            pageItems: [],
            pageSize: 15,
            totalPages: 0,
            idQuery: null,
            nameQuery: null,
            searchQuery: null,
            typeQuery: null,
            page: DEFAULT_PAGE
        };
        this.pokemons = [];

        this.pagingTopic = handlePagingMessages(this);
        this.searchTopic = handleSearchMessages(this);
        this.filterTopic = handleFilterMessages(this);
    }
    componentDidMount() {
        if (this.pokemons.length === 0) {
            (new PokemonApiProxy()).loadData(data => {
                let nextState = (new PaginationUtility()).execute(this.state.pageSize, this.state.page, data);

                this.pokemons = data;
                this.setState(nextState);
            });
        }
    }
    render() {
        return (
            <div>
                <SideNav filterTopic={this.filterTopic} />
                <h1 id='page-title'>POKEDEX</h1>
                <SearchBox searchTopic={this.searchTopic} />
                <div className='clearfix'></div>
                <PokemonCardFactory pokemons={this.state.pageItems} />
                <div className='clearfix'></div>
                <PokePagerControl currentPage={this.state.page} totalPages={this.state.totalPages}
                    pagingTopic={this.pagingTopic} pageSize={this.state.pageSize} />
                <div className='clearfix'></div>
            </div>
        );
    }
}

export default MainPanel;