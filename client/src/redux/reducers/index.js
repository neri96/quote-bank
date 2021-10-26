import { combineReducers } from 'redux';

import quoteIdR from './quoteIdR';
import responseMsg from './responseMsg';
import responseQuotes from './responseQuotes';
import responseAuth from './responseAuth';

import errorMsg from './errorMsg';
import quoteTextR from './quoteTextR';
import modalVis from './modalVis';

import userId from './userId';

export default combineReducers({
    id: quoteIdR,
    responseMsg,
    responseQuotes,
    errorMsg,
    quoteTextR,
    modalVis,
    userId,
    responseAuth
});