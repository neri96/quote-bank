import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
// import isEmpty from 'lodash.isempty';

import Overlay from '../Overlay';
import Button from '../Button';

import { resClear } from '../../../redux/actions';

import './ConfirmModal.scss';

const ConfirmModal = ({ responseMsg, resClear }) => {
    const [vis, setVis] = useState(false);
    const [text, setText] = useState('');

    const { message } = responseMsg;

    useEffect(() => { 
        if(message) {
            const showConfirm = () => {
                const makeVis = () => {
                    setText(message);
                    setVis(true);
                }
    
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(makeVis);
                    }, 1000);
                })
            }
    
            showConfirm().then(f => f())
                .then(() => {
                    setTimeout(() => {
                        closeModal();
                    }, 1500);
                })
        }
    }, [responseMsg]);

    const closeModal = () => {
        setVis(false);
        // resClear();
    }

    return (
        <React.Fragment>
            { vis && <Overlay closeModal={closeModal} /> }

            <CSSTransition
                in={vis}
                mountOnEnter
                unmountOnExit
                timeout={300}
                classNames="confirm-modal-anim"
            >
                <div className='confirm-modal'>
                    <div className='confirm-body'>
                        <h3>{text}</h3>
                    </div>
                    
                    <div className='confirm-footer'>
                        <Button type='confirm' closeModal={closeModal}>
                            Ok
                        </Button>
                    </div>
                </div>
            </CSSTransition>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        responseMsg: state.responseMsg
    }
}

export default connect(
    mapStateToProps,
    { resClear }
)(ConfirmModal);