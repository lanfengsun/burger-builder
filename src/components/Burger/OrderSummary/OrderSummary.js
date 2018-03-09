import React from 'react';
import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const style = {textTransform: "capitalize"};
    const summary = (
        Object.keys(props.ingredients).map(key => (
            <li key={key}>
                <span style={style}>{key}</span>: {props.ingredients[key]}
            </li>
        ))
    );
    
    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>Here is your delicious burger:</p>
            <ul>{summary}</ul>
        </Aux>
    )
}

export default orderSummary;