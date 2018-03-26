import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    const burger = props.ingredients ? <Burger ingredients={props.ingredients} /> : <Spinner />;
    const buttons = props.ingredients ? (
        <Aux>
            <Button btnType='Danger' clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
        </Aux>
    ) : null;
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Here is your delicious burger!</h1>
            {burger}
            {buttons}
        </div>
    )
}

export default CheckoutSummary;