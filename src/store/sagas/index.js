import { takeEvery } from 'redux-saga/effects';
import { logoutSaga, checkLoginTimeoutSaga, authSaga, checkAuthExpireSaga } from './auth';
import { initIngredientsSaga } from './burger';
import { placeOrderSaga, fetchOrdersSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.CHECK_LOGIN_TIMEOUT, checkLoginTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INIT, authSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_EXPIRE, checkAuthExpireSaga);
}

export function* watchBurger() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PLACE_ORDER, placeOrderSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}