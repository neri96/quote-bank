import { FETCH_QUOTES } from '../actions';

const responseQuotes = (state = [], { type, payload }) => {
    switch (type) {
        case FETCH_QUOTES:
            return [ ...payload ];
        default:
            return state;
    }
}

export default responseQuotes;