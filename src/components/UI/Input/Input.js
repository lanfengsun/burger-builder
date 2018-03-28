import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElem = null;
    const inputClass = [classes.InputElem];
    let invalidString = null;

    if (!props.valid) {
        inputClass.push(classes.Invalid);
        invalidString = props.invalidString ? 
                        <p className={classes.InvalidString}>{props.invalidString}</p>: 
                        <p className={classes.InvalidString}>Please enter a valid {props.label}</p>;
    }

    switch(props.inputtype) {
        case('input'):
            inputElem = <input className={inputClass.join(' ')} {...props.config} onChange={props.change} />;
            break;
        case('textarea'):
            inputElem = <textarea className={inputClass.join(' ')} {...props.config} onChange={props.change} />;
            break;
        case ('select'):
            inputElem = (
                <select className={inputClass.join(' ')} onChange={props.change}>
                    {props.config.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElem = <input className={inputClass.join(' ')} {...props.config} onChange={props.change} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElem}
            {invalidString}
        </div>
    );
}

export default input;