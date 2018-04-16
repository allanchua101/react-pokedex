import React from 'react';
import MaterializedSelect from './materialized-select.jsx';

function buildSortFields() {
    return [{
        Name: 'ID'
    }, {
        Name: 'Pokemon Type'
    }, {
        Name: 'Name'
    }];
}

function buildSortDirections() {
    return [{
        Name: 'Ascending'
    }, {
        Name: 'Descending'
    }];
}

class SideNav extends React.Component {
    constructor(props) {
        super();
        this.typeQuery = null;
        this.idQuery = null;
        this.searchQuery = null;
        this.sortField = 'ID';
        this.sortDirection = 'Ascending';
        this.filterTopic = props.filterTopic;
        this.onPokeTypeChanged = this.onPokeTypeChanged.bind(this);
        this.onPokeIdChanged = this.onPokeIdChanged.bind(this);
        this.onPokeNameChanged = this.onPokeNameChanged.bind(this);
        this.onSortFieldChanged = this.onSortFieldChanged.bind(this);
        this.onSortDirectionChanged = this.onSortDirectionChanged.bind(this);
    }
    publishEvent() {
        this.filterTopic.publish({
            typeQuery: this.typeQuery,
            nameQuery: this.nameQuery,
            idQuery: this.idQuery,
            sortField: this.sortField,
            sortDirection: this.sortDirection
        });
    }
    onPokeNameChanged(evt) {
        this.nameQuery = evt.target.value;
        this.publishEvent();
    }
    onPokeTypeChanged(evt) {
        this.typeQuery = JSON.parse(evt.target.value);
        this.publishEvent();
    }
    onPokeIdChanged(evt) {
        this.idQuery = evt.target.value;
        this.publishEvent();
    }
    onSortFieldChanged(evt) {
        this.sortField = JSON.parse(evt.target.value).Name;
        this.publishEvent();
    }
    onSortDirectionChanged(evt) {
        this.sortDirection = JSON.parse(evt.target.value).Name;
        this.publishEvent();
    }
    render() {
        let { poketypes } = this.props;
        let items = [];

        items.push({ ename: 'All' });
        items = items.concat(poketypes);

        return (
            <div className='side-nav-bar opened'>
                <div className='side-nav-form'>
                    <h2>Configuration</h2>
                    <hr />
                    <h3>Filter List</h3>
                    <input type='text' className='filter-box' onChange={this.onPokeIdChanged} placeholder='ID' required='required' />
                    <input type='text' className='filter-box' onChange={this.onPokeNameChanged} placeholder='Pokemon Name' required='required' />
                    <MaterializedSelect items={items} textProperty='ename' keyProperty='ename' 
                                        label='Pokemon Type' onChange={this.onPokeTypeChanged} />
                    <hr />
                    <h3>Sort By</h3>
                    <MaterializedSelect items={buildSortFields()} textProperty='Name' keyProperty='Name' 
                                        label='Pokemon Type' onChange={this.onSortFieldChanged} />
                    <hr />
                    <h3>Sort Direction</h3>
                    <MaterializedSelect items={buildSortDirections()} textProperty='Name' keyProperty='Name' 
                                        label='Sort Direction' onChange={this.onSortDirectionChanged} />
                </div>
            </div>
        );
    }
}

export default SideNav;