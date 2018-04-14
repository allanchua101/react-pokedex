import React from 'react';

class PokePagerButton extends React.Component {
    render() {
        let {text, tooltip, onClick, currentPage} = this.props;
        console.log(currentPage);
        console.log(text);
        return(
            <button className={'poke-pager-button ' + (currentPage === text ? 'active' : '')}
                    onClick={onClick}
                    title={tooltip}>{text}</button>
        );
    }
}

export default PokePagerButton;