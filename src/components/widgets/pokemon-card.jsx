import React from 'react';

function fixBrokenImageNames(pokemonName) {
    let brokenNames = ['Nidoran♀', 'Nidoran♂', 'Farfetch\'d', 'Mr. Mime', 'Mime Jr.', 'Flabébé'];
    let fixedNames = ['Nidoran', 'Nidoran', 'Farfetchd', 'Mr_Mime', 'Mime_Jr', 'Flabebe'];
    let searchIndex = brokenNames.indexOf(pokemonName);

    if (searchIndex > -1)
        return fixedNames[searchIndex];

    return pokemonName;
}

class PokemonCard extends React.Component {
    constructor(props) {
        super();
        this.onPokemonCardTapped = this.onPokemonCardTapped.bind(this);
    }
    onPokemonCardTapped(evt) {
        let isExpanded = this.props.isExpanded;
        
        this.props.messageBus.publish({
            event: (isExpanded ? 'SHOW ALL' : 'HIDE ALL'),
            originId: this.props.data.id
        });
    }
    render() {
        let { data, isVisible, isExpanded } = this.props;
        let imageUrl = '/images/thm/' + data.id.toString() + fixBrokenImageNames(data.ename) + '.png';

        if(this.props.isExpanded)
            imageUrl = '/images/img/' + data.id.toString() + fixBrokenImageNames(data.ename) + '.png';

        return (
            <div className={'pokemon-card' + (isVisible ? '' : ' collapsed') + (isExpanded ? ' expanded' : '')} 
                 title='Tap to see details' onClick={this.onPokemonCardTapped}>
                <img src={imageUrl} className='avatar' />
                <div className='info-panel'>
                    <p className='card-number'>{data.id}</p>
                    <p className='cardname'>{data.ename}</p>
                </div>
            </div>
        );
    }
}

export default PokemonCard;