import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { resClear } from '../../redux/actions';

import './Modal.scss';

const Modal = (props) => {
    const { type, header, footer, closeModal, responseR, resClear, errorMsg } = props;

    const didMountRef = useRef(false);

    useEffect(() => {
        if(didMountRef.current) {
            responseR.message && !errorMsg && closeModal();
        } else {
            didMountRef.current = true;
        }
    }, [responseR, errorMsg]);

    console.log(responseR);

    useEffect(() => {
        if(errorMsg) {
            document.addEventListener("click", resClear, false);
            return () => {
                document.removeEventListener("click", resClear, false);
            };
        }
    }, [errorMsg]);


    return ReactDOM.createPortal(
        <div 
            className={`modal ${!props.children && 'delete'} ${type === 'quote-ops' && 'quote-ops'}`}
            onClick={props.handleErrors}
        >
            <div className='modal-header'>
                {typeof header === 'function' ? header() : header}
            </div>

            <div className='modal-body'>
                <form>
                    <div className='quote-modal'>
                        { errorMsg && 
                            <div className='error-message'>
                                <h3>{errorMsg}</h3>
                            </div> 
                        }
                        {props.children}
                    </div>
                </form>
            </div>

            <div className='modal-footer'>
                {footer()}
            </div>
        </div>,
        document.querySelector('#modal-window')
    )
};

const mapStateToProps = (state, ownProps) => {
    const res = ownProps.type === 'auth' ? 'responseAuth' : 'responseMsg';
    return {
        responseR: state[res],
        errorMsg: state.errorMsg,
    }
}

export default connect(
    mapStateToProps,
    { resClear }
)(Modal);