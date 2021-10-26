import { FETCH_ID } from '../actions';

const quoteIdR = (state = '', { type, payload }) => {
    switch (type) {
        case FETCH_ID:
            return payload;
        default:
            return state;
    }
}

export default quoteIdR;