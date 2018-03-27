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

export const orderInit = () => ({
    type: actionTypes.ORDER_INIT
});

export const placeOrder = order => {
    return dispatch => {
        dispatch(orderPosted());
        axios.post('/orders.json', order)
            .then(res => {
                console.log(res);
                dispatch(orderBurger(order, res.data.name));
            })
            .catch(err => {
                dispatch(orderBurgerFailed(err));
            });
    }
}