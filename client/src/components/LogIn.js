import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash.isempty';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import Overlay from './modals/Overlay';
import Modal from './modals/Modal';
import Button from './modals/Button';

import { resClear, setModalVis, fetchAuth, fetchQuotes } from '../redux/actions';

import './modals/Modal.scss';
import './Auth.scss';

const LogIn = ({ 
    resClear, 
    errorMsg,
    modalVis, 
    setModalVis,
    fetchAuth
}) => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const { logIn } = modalVis;

    const handleInputs = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        setModalVis({ logIn: false });
        resClear();
    } 

    const handleSubmit = () => {
        fetchAuth('login', {...form});
    }

    const header = () => {
        return (
            <React.Fragment>
                <img src={require('../images/sign-in.svg').default} alt='logo' />
            </React.Fragment>
        )
    }

    const footer = () => {
        return (
            <React.Fragment>
                <Button type='button' handleForm={closeModal}>
                    Cancel
                </Button>
                
                <Button type='submit' handleSubmit={handleSubmit} disabled={errorMsg}>
                    Sign In
                </Button>
            </React.Fragment>
        )
    }

    return (
            <React.Fragment>
                { logIn && <Overlay closeModal={closeModal} /> }

                <CSSTransition
                    in={logIn}
                    mountOnEnter
                    unmountOnExit
                    timeout={400}
                    classNames="auth"
                >
                    <Modal 
                        type='auth'
                        header={header}
                        footer={footer}
                        closeModal={closeModal}
                    >
                    
                        <div className='auth-modal'>
                            <img src={require('../images/email.svg').default} alt='email' />
                            <input type='text' name='email' placeholder='Email' onChange={handleInputs} />
                        </div>
                        <div className='auth-modal'>
                            <img src={require('../images/password.svg').default} alt='password' />
                            <input type='password' name='password' placeholder='Password' onChange={handleInputs} />
                        </div>
                    </Modal>
                </CSSTransition>
            </React.Fragment> 
    )
}

const mapStateToProps = (state) => {
    return {
        errorMsg: state.errorMsg,
        modalVis: state.modalVis,
        responseAuth: state.responseAuth
    }
}

export default connect(
    mapStateToProps,
    { resClear, setModalVis, fetchAuth }
)(LogIn);