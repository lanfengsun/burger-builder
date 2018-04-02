import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userID');
    yield localStorage.removeItem('expirationTime');
    yield put(actions.logout());
}

export function* checkLoginTimeoutSaga(action) {
    yield delay(action.expiresIn);
    yield put(actions.initLogout());
}

export function* authSaga(action) {
    yield put(actions.authStart());
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBjrh7sLWIotKkMAmUevLP1tzIsm1P_y0E";
    if (!action.isSignUp) {
        url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBjrh7sLWIotKkMAmUevLP1tzIsm1P_y0E";
    }
    const userData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    try {
        const res = yield axios.post(url, userData);
        yield localStorage.setItem("token", res.data.idToken);
        yield localStorage.setItem("userID", res.data.localId);
        yield localStorage.setItem("expirationTime", new Date(Date.now() + res.data.expiresIn * 1000));
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkLoginTimeout(res.data.expiresIn));
    } catch(err) {
        yield put(actions.authFail(err.response.data.error));
    }
}

export function* checkAuthExpireSaga(action) {
    if (!localStorage.getItem('token')) {
        yield put(actions.initLogout());
    } else if (new Date(localStorage.getItem('expirationTime')) <= Date.now()) {
        yield put(actions.initLogout());
    } else {
        yield put(actions.authSuccess(localStorage.getItem("token"), localStorage.getItem("userID")));
    }
}