import React from 'react';
import PokePagerButton from './poke-pager-button.jsx';

class PokePagerControl extends React.Component {
    constructor(props) {
        super();

        this.pagingTopic = props.pagingTopic;
        this.onNextPage = this.onNextPage.bind(this);
        this.onPreviousPage = this.onPreviousPage.bind(this);
        this.onGoToLastPage = this.onGoToLastPage.bind(this);
        this.onGoToFirstPage = this.onGoToFirstPage.bind(this);
        this.onGoToTargetPage = this.onGoToTargetPage.bind(this);
    }
    goToPage(page) {
        this.pagingTopic.publish({ value: page });
    }
    onGoToFirstPage() {
        this.goToPage(1);
    }
    onGoToLastPage() {
        this.goToPage(this.props.totalPages);
    }
    onGoToTargetPage(evt) {
        this.goToPage(evt.target.value);
    }
    onNextPage() {
        let targetPage = this.props.currentPage;

        if (targetPage < this.props.totalPages)
            targetPage += 1;

        this.goToPage(targetPage);
    }
    onPreviousPage() {
        let targetPage = this.props.currentPage;

        if (targetPage > 1)
            targetPage -= 1;

        this.goToPage(targetPage);
    }
    render() {
        let { currentPage = 1, totalPages = 0, pageSize = 10 } = this.props;
        let pagePosition = (currentPage % 5);
        let firstPage = (pagePosition === 0) ? (currentPage - 5) : (currentPage - pagePosition);
        var pages = [1, 2, 3, 4, 5].map(id => {
            let pageId = firstPage + id;

            return <PokePagerButton key={id} text={pageId} currentPage={currentPage} 
                                    value={pageId} onClick={this.onGoToTargetPage} 
                                    isVisible={pageId <= totalPages}/>
        });

        return (
            <div className={'poke-pager-control ' + (totalPages <= 1 ? 'hidden' : '')}>
                <PokePagerButton text='&lt;&lt;' tooltip='Go to first page' onClick={this.onGoToFirstPage} />
                <PokePagerButton text='&lt;' tooltip='Go to previous page' onClick={this.onPreviousPage} />
                {pages}
                <PokePagerButton text='&gt;' tooltip='Go to next page' onClick={this.onNextPage} />
                <PokePagerButton text='&gt;&gt;' tooltip='Go to last page' onClick={this.onGoToLastPage} />
            </div>
        );
    }
}

export default PokePagerControl;
