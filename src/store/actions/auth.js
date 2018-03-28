import * as actionTypes from './actionTypes';

const auth_start = () => ({
    type: actionTypes.AUTH_START
});

const auth_success = (token, userID) => ({
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userID: userID
});

const auth_fail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(auth_start());
    }
}