import { SET_USER_ID } from '../actions';

const userIdReducer = (state = '', { type, payload }) => {
    switch (type) {
        case SET_USER_ID:
            return payload;
        default:
            return state;
    }
}

export default userIdReducer;