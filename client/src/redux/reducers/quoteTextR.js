import { RET_TEXT } from '../actions';

const quoteTextR = (state = '', { type, payload }) => {
    switch (type) {
        case RET_TEXT:
            return payload;
        default:
            return state;
    }
}

export default quoteTextR;