import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* placeOrderSaga(action) {
    yield put(actions.orderPosted());
    try {
        const res = yield axios.post('/orders.json?auth=' + action.token, action.order);
        yield put(actions.orderBurger(action.order, res.data.name));
    } catch(err) {
        yield put(actions.orderBurgerFailed(err));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userID"&equalTo="' + action.userID + '"';
    try {
        const res = yield axios.get("orders.json" + queryParams);
        const orders = [];
        for (let key in res.data) {
            orders.push({
                key: key,
                ingredients: res.data[key].ingredients,
                price: res.data[key].price.toFixed(2)
            });
        }
        yield put(actions.fetchOrdersDone(orders));
    } catch(err) {
        yield put(actions.fetchOrdersFailed(err));
    }
}