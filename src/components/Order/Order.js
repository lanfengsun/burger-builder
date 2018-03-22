import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const style={
        border: '1px solid #ccc',
        boxShadow: '0 1px 2px #eee',
        padding: '10px',
        margin: '0 8px',
        textTransform: 'capitalize',
        display: 'inline-block'
    }

    const ingredientsArray = [];
    for (let i in props.ingredients) {
        ingredientsArray.push({
            name: i,
            amount: props.ingredients[i]
        });
    }

    const ingredients = (
        ingredientsArray.map(ig => (
            <span key={ig.name} style={style}>{ig.name}: {ig.amount}</span>
        ))
    );

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    );
}

export default order;