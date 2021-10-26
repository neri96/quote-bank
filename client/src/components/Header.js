import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchAuth, setModalVis } from '../redux/actions';

import './Header.scss';

const Header = ({ isAuthed, fetchAuth, setModalVis }) => {
    const logOut = () => {
        fetchAuth('logout', null);
    }

    if(isAuthed) {
        setModalVis({ logIn: false, register: false });
        return (
            <header>
                <div className='main-icon'>
                    <a href='/'>
                        <img src={require('../images/logo.svg').default} alt='logo' />
                    </a>
                </div>

                <div className='right-side-list'>
                    <ul>
                        <li onClick={() => setModalVis({ newQuote: true })}>
                            <div className="top-right">
                                <h3>new quote</h3>
                            </div>
                        </li>

                        <li onClick={logOut}>
                            <div className="top-right">
                                <h3>log out</h3>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }

    if(!isAuthed) {
        return (
            <header>
                <div className='main-icon'>
                    <a href='/'>
                        <img src={require('../images/logo.svg').default} alt='logo' />
                    </a>
                </div>

                <div className='right-side-list'>
                    <ul>
                        <li onClick={() => setModalVis({ logIn: true })}>
                            <div className='sign-in top-right'>
                                <h3>sign in</h3>
                            </div>
                        </li>

                        <li onClick={() => setModalVis({ register: true })}>
                            <div className="sign-up top-right">
                                <h3>sign up</h3>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
}


export default connect(
    null,
    { fetchAuth, setModalVis }
)(Header);