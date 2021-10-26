import axios from 'axios';

export const FETCH_RES = 'fetch_res';
export const FETCH_QUOTES = 'fetch_quotes';
export const FETCH_AUTH = 'fetch_auth';


export const FETCH_REQ_LOGIN = 'fetch_req_login';
export const FETCH_REQ = 'fetch_req';
export const FETCH_ERROR = 'fetch_error';

export const RES_CLEAR = 'res_clear';
export const FETCH_ID = 'fetch_id';
export const RET_TEXT = 'retrieve_text';
export const SET_MODAL_VIS = 'set_modal_vis'; // visibility
export const SET_USER_ID = 'set_user_id';


export const setModalVis = (modal) => {
    return {
        type: SET_MODAL_VIS,
        payload: modal
    }
}

export const setUserId = (userId) => {
    return {
        type: SET_USER_ID,
        payload: userId
    }
}

export const fetchQuotes = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/quote/');

            dispatch({ type: FETCH_QUOTES, payload: res.data.quotes });
        } catch (err) {
            dispatch({ type: FETCH_ERROR, payload: err.response });
        }
    }
}

export const fetchCrud = (method, url, data) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method, 
                url: `/${url}`,
                data
            });

            if(!res.ok) {
                // dispatch({ type: FETCH_ERROR, payload: err.response.data });
            }
            
            dispatch({ type: FETCH_RES, payload: res.data });
        } catch (err) {
            dispatch({ type: FETCH_ERROR, payload: err.response.data.error });
        }
    } 
}

export const fetchAuth = (url, data) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: 'POST',
                url: `/auth/${url}`,
                data
            });

            dispatch({ type: FETCH_AUTH, payload: res.data });
        } catch (err) {
            dispatch({ type: FETCH_ERROR, payload: err.response.data.error });
        }
    }
}

export const resClear = () => {
    return {
        type: RES_CLEAR
    }
}

export const quoteId = (id) => {
    return {
        type: FETCH_ID,
        payload: id
    }
}

export const quoteText = (text) => {
    return {
        type: RET_TEXT,
        payload: text
    }
}