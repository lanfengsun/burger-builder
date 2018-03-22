import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElem = null;
    switch(props.inputtype) {
        case('input'):
            inputElem = <input className={classes.InputElem} {...props} />;
            break;
        case('textarea'):
            inputElem = <textarea className={classes.InputElem} {...props} />;
            break;
        default:
            inputElem = <input className={classes.InputElem} {...props} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
        </div>
    );
}

export default input;