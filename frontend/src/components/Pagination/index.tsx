import './styles.css';

import { ReactComponent as ArrawIcon } from 'assets/images/arrow.svg';

const Pagination = () => {
    return (
        <div className='pagination-container'>
            <ArrawIcon className='arrow-previos arrow-inactive'/>
            <div className='pagination-icon active'>1</div>
            <div className='pagination-icon'>2</div>
            <div className='pagination-icon'>3</div>
            <div className='pagination-icon'>4</div>
            <div className='pagination-icon'>...</div>
            <div className='pagination-icon'>10</div>
            <ArrawIcon className='arrow-next arrow-active'/>
        </div>

    );
}

export default Pagination;