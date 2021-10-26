import React from 'react';
import { connect } from 'react-redux';

import { setModalVis } from '../../redux/actions';

import './Menu.scss';

const EditBtn = ({ setModalVis }) => {
    return (
        <div 
            className='menu-edit change' 
            onClick={() => setModalVis({ editQuote: true })}
        >
            <img src={require('../../images/edit.svg').default} alt='edit' />
            <h4>Edit</h4>
        </div>
    )
}

export default connect(
    null,
    { setModalVis }
)(EditBtn);