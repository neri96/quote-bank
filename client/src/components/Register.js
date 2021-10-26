import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash.isempty';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import Overlay from './modals/Overlay';
import Modal from './modals/Modal';
import Button from './modals/Button';

import { fetchAuth, resClear, setModalVis } from '../redux/actions';

import './modals/Modal.scss';
import './Auth.scss';

const Register = ({ fetchAuth, setModalVis, modalVis, errorMsg }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        repPassword: ''
    });

    const { register } = modalVis;

    const handleInputs = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        setModalVis({ register: false });
    } 

    const handleSubmit = () => {
        fetchAuth('register', {...form});
    }

    const header = () => {
        return (
            <React.Fragment>
                <img src={require('../images/sign-up.svg').default} alt='logo' />
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
                    Sign Up
                </Button>
            </React.Fragment>
        )
    }

    return (
            <React.Fragment>
                { register && <Overlay closeModal={closeModal} /> }

                <CSSTransition
                    in={register}
                    mountOnEnter
                    unmountOnExit
                    timeout={400}
                    classNames="auth"
                >
                    <Modal 
                        type='sign-up'
                        header={header}
                        footer={footer}
                    >
                        <div className='auth-modal'>
                            <img src={require('../images/login.svg').default} alt='name' />
                            <input 
                                type='text' 
                                name='name' 
                                placeholder='Name'
                                className='name-input' 
                                value={form.name} 
                                onChange={handleInputs} 
                            />
                        </div>
                        <div className='auth-modal'>
                            <img src={require('../images/email.svg').default} alt='email' />
                            <input 
                                type='text'
                                name='email'
                                placeholder='Email' 
                                value={form.email} 
                                onChange={handleInputs} 
                            />
                        </div>
                        <div className='auth-modal'>
                            <img src={require('../images/password.svg').default} alt='password' />
                            <input 
                                type='password' 
                                name='password' 
                                placeholder='Password' 
                                value={form.password} 
                                onChange={handleInputs} 
                            />
                        </div>
                        <div className='auth-modal'>
                            <img src={require('../images/password.svg').default} alt='password' />
                            <input 
                                type='password' 
                                name='repPassword' 
                                placeholder='Repeat your password'
                                value={form.repPassword}
                                onChange={handleInputs} 
                            />
                        </div>
                    </Modal>
                </CSSTransition>
            </React.Fragment> 
    )
};

const mapStateToProps = (state) => {
    return {
        // fetchResReg: state.fetchResReg,
        errorMsg: state.errorMsg,
        modalVis: state.modalVis
    }
}

export default connect(
    mapStateToProps,
    { fetchAuth, resClear, setModalVis }
)(Register);