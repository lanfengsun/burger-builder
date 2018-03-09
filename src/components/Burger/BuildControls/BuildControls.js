import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Bacon', type: 'bacon' },
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    add={() => props.add(ctrl.type)}
                    remove={() => props.remove(ctrl.type)}
                    disable={props.disable[ctrl.type]} />
            ))}
            <button className={classes.OrderButton} disabled={!props.purchasable}>
                ORDER NOW
            </button>
        </div>
    )
}

export default buildControls;