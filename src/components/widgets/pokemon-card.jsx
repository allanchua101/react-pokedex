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
        this.onPokemonCardClosed = this.onPokemonCardClosed.bind(this);
    }
    onPokemonCardTapped(evt) {
        let isExpanded = this.props.isExpanded;

        if (!isExpanded) {
            this.props.messageBus.publish({
                event: 'HIDE ALL',
                originId: this.props.data.id
            });
        }
    }
    onPokemonCardClosed(evt) {
        this.props.messageBus.publish({
            event: 'SHOW ALL',
            originId: this.props.data.id
        });
    }
    render() {
        let { data, isVisible, isExpanded, types } = this.props;
        let imageUrl = `/images/thm/${data.id.toString()}${fixBrokenImageNames(data.ename)}.png`;
        let spriteUrl = `/images/spr/${data.id.toString()}MS.png`;

        if (this.props.isExpanded)
            imageUrl = `/images/img/${data.id.toString()}${fixBrokenImageNames(data.ename)}.png`;

        return (
            <div className={'pokemon-card' + (isVisible ? '' : ' collapsed') + (isExpanded ? ' expanded' : '')}
                title='Tap to see details' onClick={this.onPokemonCardTapped}>
                <img src={imageUrl} className='avatar' />
                <img src={spriteUrl} className='sprite' />
                <a href="#" className="close-marker" onClick={this.onPokemonCardClosed} />
                <div className='info-panel'>
                    <p className='card-number'>{data.id}</p>
                    <p className='cardname'>{data.ename}</p>
                    <p className='card-prop show-on-expand'>
                        {types.map(type => {
                            return <span key={type} className='type-tag'>{type}</span>;
                        })}
                    </p>
                    <p className='card-prop show-on-expand'>Attack: {data.base.Attack}</p>
                    <p className='card-prop show-on-expand'>Defense: {data.base.Defense}</p>
                    <p className='card-prop show-on-expand'>HP: {data.base.HP}</p>
                    <p className='card-prop show-on-expand'>Sp.Atk: {data.base['Sp.Atk']}</p>
                    <p className='card-prop show-on-expand'>Sp.Def: {data.base['Sp.Def']}</p>
                    <p className='card-prop show-on-expand'>Speed: {data.base.Speed}</p>
                </div>
            </div>
        );
    }
}

export default PokemonCard;