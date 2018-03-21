import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Here is your delicious burger!</h1>
            <Burger ingredients={props.ingredients} />
            <Button btnType='Danger' onClick>CANCEL</Button>
            <Button btnType='Success' onClick>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;