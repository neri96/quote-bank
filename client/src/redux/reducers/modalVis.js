import { SET_MODAL_VIS } from '../actions';

export const initialState = {
    logIn: false,
    register: false,
    newQuote: false,
    editQuote: false,
    deleteQuote: false
}

const modalVis = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MODAL_VIS:
            return { ...state, ...payload }
        default:
            return state;
    }
}

export default modalVis;