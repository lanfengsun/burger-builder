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
                dispatch(authSuccess(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    }
}