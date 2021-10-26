import omit from 'lodash.omit';

import { FETCH_ERROR, RES_CLEAR } from '../actions';

let initialState = '';

const errorMsg = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ERROR:
            return payload;
        case RES_CLEAR:
            return initialState;
        default:
            return state;
    }
}

export default errorMsg;