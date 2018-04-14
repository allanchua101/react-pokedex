import React from 'react';
import PokePagerButton from './poke-pager-button.jsx';

class PokePagerControl extends React.Component {
    render() {
        let {currentPage = 1, totalPages = 0, pageSize = 10} = this.props;
        let pagePosition = (currentPage % 5);
        let firstPage = (pagePosition === 0) ? (currentPage - 5) : (currentPage - pagePosition);

        return(
            <div className={'poke-pager-control ' + (totalPages <= 1 ? 'hidden' : '')}>
                <PokePagerButton text='&lt;&lt;' tooltip='Go to first page' />
                <PokePagerButton text='&lt;' tooltip='Go to previous page' />
                <PokePagerButton text={firstPage + 1} />
                <PokePagerButton text={firstPage + 2} />
                <PokePagerButton text={firstPage + 3} />
                <PokePagerButton text={firstPage + 4} />
                <PokePagerButton text={firstPage + 5} />
                <PokePagerButton text='&gt;' tooltip='Go to next page' />
                <PokePagerButton text='&gt;&gt;' tooltip='Go to last page' />
            </div>
        );
    }
}

export default PokePagerControl;
