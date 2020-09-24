import React from 'react';

import classes from './RegisterSuccess.module.css';

const RegisterSuccess = (props) => {
    setTimeout(() => {
        props.history.push('/');
    }, 5000)
    console.log(props);
    return (
        <div className={classes.Wrapper}>
            <h2>Hello {props.location.myProps.email}</h2>
            <p>You can log in now. Wait for page to redirect you back!</p>
        </div>
    )
}

export default RegisterSuccess;