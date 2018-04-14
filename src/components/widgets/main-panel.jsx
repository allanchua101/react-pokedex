import React from 'react';
import SideNav from './side-navigation-bar.jsx';
import PokemonCardFactory from './pokemon-card-factory.jsx';
import PokePagerControl from './poke-pager-control.jsx';
import SearchBox from './search-box.jsx';
import PokemonApiProxy from '../api-proxies/pokemon-api-proxy.jsx';
import MessagingTopic from '../pubsub/messaging-topic.jsx';

function handlePagingMessages(instance) {
    instance.pagingTopic
        .messages()
        .subscribe(msg => {
            var nextState = getPaginatedState(instance.state.pageSize, msg.value, instance.pokemons);

            instance.setState(nextState);
        });
}

function filterPokemonsByName(data, name) {
    let output = [];
    let smallCapsName = name.toLowerCase();

    if (name) {
        for (let i = 0, len = data.length; i < len; i++) {
            const item = data[i];

            if (item.ename.toLowerCase().indexOf(smallCapsName) > -1)
                output.push(item);
        }
    } else {
        const clonedData = data;

        output = (clonedData);
    }

    return output;
}

function handleFilterMessages(instance) {
    instance.filteringTopic
        .messages()
        .subscribe(msg => {
            var filteredPokemons = filterPokemonsByName(instance.pokemons, msg);
            var nextState = getPaginatedState(
                                instance.state.pageSize, instance.state.page, 
                                filteredPokemons
                            );

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

        this.pagingTopic = new MessagingTopic();
        handlePagingMessages(this);

        this.filteringTopic = new MessagingTopic();
        handleFilterMessages(this);

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
                <SearchBox filteringTopic={this.filteringTopic} />
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