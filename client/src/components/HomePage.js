import React, { useState, useEffect } from 'react';

import Quotes from './Quotes';

import NewQuote from './NewQuote';
import DeleteQuote from './DeleteQuote';
import EditQuote from './EditQuote';
import ConfirmModal from './modals/confirmation/ConfirmModal';

import LogIn from './LogIn';
import Register from './Register';

const HomePage = ({ isAuthed }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        isAuthed ? setLoggedIn(true) : setLoggedIn(false);
    }, [isAuthed]);

    console.log('render HP');

    return (
        <div>
            <Quotes loggedIn={loggedIn} />
            <ConfirmModal />
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
    )
}

export default HomePage;