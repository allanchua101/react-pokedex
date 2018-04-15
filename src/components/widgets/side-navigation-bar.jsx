import React from 'react';

class SideNav extends React.Component {
    constructor(props) {
        super();
        this.typeQuery = null;
        this.idQuery = null;
        this.searchQuery = null;
        this.filterTopic = props.filterTopic;
        this.onPokeTypeChanged = this.onPokeTypeChanged.bind(this);
        this.onPokeIdChanged = this.onPokeIdChanged.bind(this);
        this.onPokeNameChanged = this.onPokeNameChanged.bind(this);
    }
    publishEvent() {
        this.filterTopic.publish({
            typeQuery: this.typeQuery,
            nameQuery: this.searchQuery,
            idQuery: this.idQuery
        });
    }
    onPokeNameChanged(evt) {
        this.nameQuery = evt.target.value;
        this.publishEvent();
    }
    onPokeTypeChanged(evt) {
        this.typeQuery = evt.target.value;
        this.publishEvent();
    }
    onPokeIdChanged(evt) {
        this.idQuery = evt.target.value;
        this.publishEvent();
    }
    render() {
        return (
            <div className='side-nav-bar opened'>
                <div className='side-nav-form'>
                    <h2>Configuration</h2>
                    <hr />
                    <h3>Filter List</h3>
                    <input type='text' className='filter-box' onChange={this.onPokeIdChanged} placeholder='ID' required="required"/>
                    <input type='text' className='filter-box' onChange={this.onPokeNameChanged} placeholder='Pokemon Name' required="required" />
                    <input type='text' className='filter-box' onChange={this.onPokeTypeChanged} placeholder='Type' required="required" />
                </div>                    
            </div>
        );
    }
}

export default SideNav;