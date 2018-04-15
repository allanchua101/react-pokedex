import React from 'react';

class SearchBox extends React.Component {
    constructor(props) {
        super();
        this.searchTopic = props.searchTopic;
        this.onSearchChanged = this.onSearchChanged.bind(this);
    }
    onSearchChanged(evt) {
        this.searchTopic.publish(evt.target.value);
    }
    render() {
        return (
            <input className='search-box' placeholder='Search by pokemon name...' 
                   onChange={this.onSearchChanged}/>
        );
    }
}

export default SearchBox;