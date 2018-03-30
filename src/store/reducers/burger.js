import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    bacon: 0.6,
    salad: 0.8,
    cheese: 0.5,
    meat: 1.0
};

const BASE_PRICE = 6.6;

const initialState = {
    ingredients: null,
    totalPrice: null,
    error: false,
    isBuilding: false
};

const changeIngredient = (state, action, amount) => {
    const newIngredients = updateObject(state.ingredients, {
      [action.ing]: state.ingredients[action.ing] + amount
    });
    const newState = {
        ingredients: newIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ing] * amount,
        isBuilding: true
    };
    return updateObject(state, newState);
}

const addIngredient = (state, action) => changeIngredient(state, action, 1);

const removeIngredient = (state, action) => changeIngredient(state, action, -1);

const fetchIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: BASE_PRICE,
        error: false,
        isBuilding: false
    });
}

const fetchIngredientsFailed = (state, action) => updateObject(state, { error: true });

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS: return fetchIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;