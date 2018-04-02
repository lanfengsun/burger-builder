import * as actionTypes from './actionTypes';


export const fetchIngredients = (ingredients) => ({
    type: actionTypes.FETCH_INGREDIENTS,
    ingredients: ingredients
});

export const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const addIngredient = (ing) => ({
    type: actionTypes.ADD_INGREDIENT,
    ing: ing
});

export const removeIngredient = (ing) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ing: ing
});

export const initIngredients = () => ({
    type: actionTypes.INIT_INGREDIENTS
});