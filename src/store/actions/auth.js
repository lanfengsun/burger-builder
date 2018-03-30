import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => ({
    type: actionTypes.AUTH_START
});

const authSuccess = (token, userID) => ({
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userID: userID
});

const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

const checkLoginTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout( () => dispatch(logout()), expiresIn * 1000 );
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBjrh7sLWIotKkMAmUevLP1tzIsm1P_y0E";
        if (!isSignUp) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBjrh7sLWIotKkMAmUevLP1tzIsm1P_y0E";
        }
        const userData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post(url, userData)
            .then(res => {
                localStorage.setItem("token", res.data.idToken);
                localStorage.setItem("userID", res.data.localId);
                localStorage.setItem("expirationTime", new Date(Date.now() + res.data.expiresIn * 1000));
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkLoginTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    }
}

export const checkAuthExpire = () => {
    return dispatch => {
        if (!localStorage.getItem('token')) {
            dispatch(logout());
        } else if (new Date(localStorage.getItem('expirationTime')) <= Date.now()) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(localStorage.getItem("token"), localStorage.getItem("userID")));
        }
    }
}

export const setAuthRedirect = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path
});