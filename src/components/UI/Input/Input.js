import React from 'react';

import classes from './Input.module.css';

const Input = props => {
    let inputEl = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType){
        case 'input':
            inputEl = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        default:
            inputEl = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            {inputEl}
        </div>
    )
}

export default Input;