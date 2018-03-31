import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    const initialState = {
        token: null,
        userID: null,
        error: null,
        loading: false,
        authRedirect: '/'
    };

    it('should return initialState on initialization', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should update token and userID upon login', () => {
        expect(reducer(initialState, { 
            type: actionTypes.AUTH_SUCCESS,
            token: 'token',
            userID: 'userID'
        })).toEqual({
            ...initialState,
            token: 'token',
            userID: 'userID'
        });
    })
});