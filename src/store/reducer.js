import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    bacon: 0.6,
    salad: 0.8,
    cheese: 0.5,
    meat: 1.0
};

const BASE_PRICE = 6.6;

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: BASE_PRICE
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ing]: state.ingredients[action.ing] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ing]
            };
        case actionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.ing] <= 0) return state;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ing]: state.ingredients[action.ing] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ing]
            }
        default:
            return state;
    }
};

export default reducer;