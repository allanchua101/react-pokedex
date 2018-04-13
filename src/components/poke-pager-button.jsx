import React from 'react';

class PokePagerButton extends React.Component {
    render() {
        let {text, tooltip, onClick} = this.props;

        return(
            <button className='poke-pager-button' 
                    onClick={onClick}
                    title={tooltip}>{text}</button>
        );
    }
}

export default PokePagerButton;