import React from 'react';

class SearchBox extends React.Component {
    constructor(props) {
        super();
        this.filteringTopic = props.filteringTopic;
        this.onSearchChanged = this.onSearchChanged.bind(this);
    }
    onSearchChanged(evt) {
        this.filteringTopic.publish(evt.target.value);
    }
    render() {
        return (
            <input className='search-box' placeholder='Search by pokemon name...' 
                   onChange={this.onSearchChanged}/>
        );
    }
}

export default SearchBox;