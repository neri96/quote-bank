import React from 'react';
import { connect } from 'react-redux';

import { setModalVis } from '../../redux/actions';

import './Menu.scss';

const DeleteBtn = ({ setModalVis }) => {
    return (
        <div className='menu-delete change' onClick={() => setModalVis({ deleteQuote: true })}>
            <img src={require('../../images/delete.svg').default} alt='delete' />
            <h4>Delete</h4>
        </div>
    )
}

export default connect(
    null,
    { setModalVis }
)(DeleteBtn);