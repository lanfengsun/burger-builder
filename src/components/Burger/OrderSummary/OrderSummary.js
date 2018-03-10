import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

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
            <strong>Total Price: ${props.price.toFixed(2)}</strong>
            <p>Do you want to continue?</p>
            <Button btnType='Danger' clicked={props.orderCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.orderContinue}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;