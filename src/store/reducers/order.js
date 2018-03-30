import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    orders: [],
    loading: false,
    orderFinished: false
}

const orderInit = (state, action) => updateObject(state, { loading: false, orderFinished: false });

const orderPosted = (state, action) => updateObject(state, { loading: true });

const orderBurger = (state, action) => updateObject(state, { loading: false, orderFinished: true });

const orderBurgerFailed = (state, action) => updateObject(state, { loading: false, orderFinished: true });

const fetchOrdersStart = (state, action) => updateObject(state, { loading: true });

const fetchOrdersDone = (state, action) => updateObject(state, { orders: action.orders, loading: false });

const fetchOrdersFailed = (state, action) => updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ORDER_INIT: return orderInit(state, action);
        case actionTypes.ORDER_POSTED: return orderPosted(state, action);
        case actionTypes.ORDER_BURGER: return orderBurger(state, action);
        case actionTypes.ORDER_BURGER_FAILED: return orderBurgerFailed(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_DONE: return fetchOrdersDone(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
        default: return state;
    }
}

export default reducer;