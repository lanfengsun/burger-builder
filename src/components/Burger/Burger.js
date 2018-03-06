import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map(key => (
        [...Array(props.ingredients[key])].map((_, i) => (
            <BurgerIngredient key={key + i} type={key} />
        ))
    )).reduce((arr, el) => arr.concat(el), []);
    
    if (ingredients.length === 0) {
        ingredients = <p>Please start adding new ingredients.</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {ingredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;