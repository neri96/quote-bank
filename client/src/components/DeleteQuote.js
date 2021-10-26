import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Overlay from './modals/Overlay';
import Modal from './modals/Modal';
import Button from './modals/Button';

import { fetchCrud, setModalVis, resClear } from '../redux/actions';

import './NewQuote.scss';
import './modals/Modal.scss';


const DeleteQuote = ({ fetchCrud, setModalVis, modalVis, quoteId }) => {
    const { deleteQuote } = modalVis;

    const closeModal = () => {
        setModalVis({ deleteQuote: false });
    }

    const handleSubmit = () => {
        fetchCrud(
            'DELETE',
            `quote/delete/${quoteId}`,
            null
        );
    };

    const footer = () => {
        return (
            <React.Fragment>
                <Button type='button' handleForm={closeModal}>
                    No
                </Button>
                
                <Button type='submit' handleSubmit={handleSubmit} >
                    Yes
                </Button>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {deleteQuote && <Overlay closeModal={closeModal} />}
            
            <CSSTransition
                in={deleteQuote}
                mountOnEnter
                unmountOnExit
                timeout={300}
                classNames="new-quote"
            >
                <Modal 
                    header={<h3>Do you really want to delete this masterpeace?</h3>} 
                    footer={footer}
                    closeModal={closeModal}
                />
            </CSSTransition>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        quoteId: state.id,
        modalVis: state.modalVis
    }
}

export default connect(
    mapStateToProps,
    { fetchCrud, setModalVis, resClear }
)(DeleteQuote);