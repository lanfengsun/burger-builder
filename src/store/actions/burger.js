import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const fetchIngredients = (ingredients) => ({
    type: actionTypes.FETCH_INGREDIENTS,
    ingredients: ingredients
});

const fetchIngredientsFailed = () => ({
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

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(res => {
            dispatch(fetchIngredients(res.data));
        }).catch(res => {
            dispatch(fetchIngredientsFailed());
        });
    }
};