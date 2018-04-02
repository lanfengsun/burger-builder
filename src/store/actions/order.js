import * as actionTypes from './actionTypes';

export const orderBurger = (order, orderID) => ({
    type: actionTypes.ORDER_BURGER,
    order: order,
    orderID: orderID
});

export const orderBurgerFailed = error => ({
    type: actionTypes.ORDER_BURGER_FAILED,
    error: error
});

export const orderPosted = () => ({
    type: actionTypes.ORDER_POSTED
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});


export const fetchOrdersDone = orders => ({
    type: actionTypes.FETCH_ORDERS_DONE,
    orders: orders
});

export const fetchOrdersFailed = error => ({
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
});

export const orderInit = () => ({
    type: actionTypes.ORDER_INIT
});

export const placeOrder = (order, token) => ({
    type: actionTypes.PLACE_ORDER,
    order: order,
    token: token
});

export const fetchOrders = (token, userID) => ({
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userID: userID
});