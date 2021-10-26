import omit from 'lodash.omit';

import { FETCH_RES, RES_CLEAR } from '../actions';

const responseMsg = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_RES:
            return { ...payload };
        case RES_CLEAR:
            return omit(state, 'message');
        default:
            return state;
    }
}

export default responseMsg;