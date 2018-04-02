import * as actionTypes from './actionTypes';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (token, userID) => ({
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userID: userID
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

export const checkLoginTimeout = (expiresIn) => ({
    type: actionTypes.CHECK_LOGIN_TIMEOUT,
    expiresIn: expiresIn * 1000
});

export const initLogout = () => ({
    type: actionTypes.AUTH_INIT_LOGOUT
});

export const logout = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const auth = (email, password, isSignUp) => ({
    type: actionTypes.AUTH_INIT,
    email: email,
    password: password,
    isSignUp: isSignUp
});

export const checkAuthExpire = () => ({
    type: actionTypes.CHECK_AUTH_EXPIRE
});

export const setAuthRedirect = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path
});