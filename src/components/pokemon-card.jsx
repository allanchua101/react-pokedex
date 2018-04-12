import React from 'react';

class PokemonCard extends React.Component {
    render() {
        let {data} = this.props;
        let imageUrl = '/images/thm/' + data.id.toString() + data.ename + '.png';

        return (
            <div className='pokemon-card'>
                <img src={imageUrl} class='avatar' />
                <div class='info-panel'>
                    <p class='cardname'>{data.id} - {data.ename}</p>
                </div>
            </div>
        );
    }
}

export default PokemonCard;