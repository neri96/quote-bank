import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Quote from './Quote';
import Loader from './loader/Loader';

import './Quotes.scss';

import { fetchQuotes } from '../redux/actions';

const Quotes = ({ 
    fetchQuotes, 
    responseQuotes,
    responseMsg, 
    responseAuth
}) => {
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setLoading(true);
        fetchQuotes();
    }, [fetchQuotes, responseAuth, responseMsg]);

    return (
        <div className='quotes'>
            {
                responseQuotes.map(quote => {
                    return (
                        <Quote key={quote._id} quote={quote} />
                    )
                })
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        responseQuotes: state.responseQuotes,
        responseMsg: state.responseMsg,
        thumbUp: state.thumbUp,
        responseAuth: state.responseAuth
    }
}

export default connect(
    mapStateToProps,
    { fetchQuotes }
)(Quotes);


