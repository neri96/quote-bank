import omit from 'lodash.omit';

import { FETCH_AUTH, RES_CLEAR } from '../actions';

const responseAuth = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_AUTH:
            return { ...payload };
        case RES_CLEAR:
            return omit(state, 'message');
        default:
            return state;
    }
}

export default responseAuth;