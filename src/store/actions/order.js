import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const orderBurger = (order, orderID) => ({
    type: actionTypes.ORDER_BURGER,
    order: order,
    orderID: orderID
});

const orderBurgerFailed = error => ({
    type: actionTypes.ORDER_BURGER_FAILED,
    error: error
});

const orderPosted = () => ({
    type: actionTypes.ORDER_POSTED
});

const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});


const fetchOrdersDone = orders => ({
    type: actionTypes.FETCH_ORDERS_DONE,
    orders: orders
});

const fetchOrdersFailed = error => ({
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
});

export const orderInit = () => ({
    type: actionTypes.ORDER_INIT
});

export const placeOrder = (order, token) => {
    return dispatch => {
        dispatch(orderPosted());
        axios.post('/orders.json?auth=' + token, order)
            .then(res => {
                console.log(res);
                dispatch(orderBurger(order, res.data.name));
            })
            .catch(err => {
                dispatch(orderBurgerFailed(err));
            });
    }
}

export const fetchOrders = (token, userID) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userID"&equalTo="' + userID + '"';
        axios.get("orders.json" + queryParams)
          .then(res => {
            const orders = [];
            for (let key in res.data) {
              orders.push({
                key: key,
                ingredients: res.data[key].ingredients,
                price: res.data[key].price.toFixed(2)
              });
            }
            dispatch(fetchOrdersDone(orders));
          })
          .catch(err => {
            dispatch(fetchOrdersFailed(err));
          });
    }
}