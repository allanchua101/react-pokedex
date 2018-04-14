import React from 'react';

class PokePagerButton extends React.Component {
    render() {
        let {text, tooltip, onClick, currentPage, value, isVisible = true} = this.props;

        return(
            <button className={'poke-pager-button ' 
                                    + (currentPage === text ? ' active' : '')
                                    + (isVisible ? '' : ' hidden')}
                    onClick={onClick}
                    title={tooltip}
                    value={value}>{text}</button>
        );
    }
}

export default PokePagerButton;