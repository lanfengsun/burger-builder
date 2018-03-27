import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    orderFinished: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ORDER_INIT:
            return {
                ...state,
                loading: false,
                orderFinished: false
            }
        case actionTypes.ORDER_POSTED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_BURGER:
            const newOrder = {
                ...action.order,
                id: action.orderID
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                orderFinished: true
            };
        case actionTypes.ORDER_BURGER_FAILED:
            return {
                ...state,
                loading: false,
                orderFinished: true
            };
        default:
            return state;
    }
}

export default reducer;