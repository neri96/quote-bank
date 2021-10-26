import React, { useState, useEffect, Fragment } from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';

import { setUserId } from './redux/actions';

import Header from './components/Header';
import Quotes from './components/Quotes';

import NewQuote from './components/NewQuote';
import DeleteQuote from './components/DeleteQuote';
import EditQuote from './components/EditQuote';
import ConfirmModal from './components/modals/confirmation/ConfirmModal';

import LogIn from './components/LogIn';
import Register from './components/Register';
import responseQuotes from './redux/reducers/responseQuotes';
// import HomePage from './components/HomePage';
// import Profile from './components/Profile';

const App = ({ cookies, logOut, userId, setUserId, responseAuth }) => {
    const [isAuthed, setAuthed] = useState(false);

    useEffect(() => {
        const token = cookies.get('access_token');
        const userIdCookie = cookies.get('user_id');

        if(token) {
            setAuthed(true);
            setUserId(userIdCookie);
        } else {
            setAuthed(false);
            setUserId('');
        }
    },  [responseAuth]);

    console.log(cookies.cookies.access_token);
    
    return (
        <Fragment>
            <Header isAuthed={isAuthed} />
            <div>
                <Quotes />
                {isAuthed ?
                    <React.Fragment>
                        <NewQuote />
                        <DeleteQuote />
                        <EditQuote />
                    </React.Fragment>
                                    
                : 
                    <React.Fragment>
                        <LogIn />
                        <Register />
                    </React.Fragment>
                }
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        logOut: state.logOut,
        userId: state.userId,
        responseAuth: state.responseAuth
    }
}

export default connect(
    mapStateToProps,
    { setUserId }
)(withCookies(App));