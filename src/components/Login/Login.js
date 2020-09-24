import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import * as actions from '../../store/actions/index';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';

const Login = props => {

    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your password'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        }
    })

    const updateObject = (oldObj, updatedProps) => {
        return {
            ...oldObj,
            ...updatedProps
        }
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        if(!rules){
            return true
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    const onChangedHandler = (e, inputName) => {
        const updatedInputs = updateObject(loginForm, {
            [inputName]: updateObject(loginForm[inputName], {
                value: e.target.value,
                valid: checkValidity(e.target.value, loginForm[inputName].validation),
                touched: true
            })
        })
        setLoginForm(updatedInputs);
    }

    const formElementsArr = [];

    for(let key in loginForm){
        formElementsArr.push({
            id: key,
            config: loginForm[key]
        })
    }

    let formIsValid = null;
    const formIsValidCheck = [];
    formElementsArr.map(el => {
        if(el.config.valid){
            formIsValidCheck.push('good');
        }
    })

    if(formIsValidCheck.length === 2){
        formIsValid = true;
    }

    const onLoginHandler = e => {
        e.preventDefault();
        if(formIsValid){
            props.onLogin(loginForm.email.value, loginForm.password.value);
        }
    }

    let form = formElementsArr.map(formEl => (
        <Input 
            key={formEl.id}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            changed={(e) => onChangedHandler(e, formEl.id)}
        />
    ))

    let loginRedirect = null;
    if(props.isAuthenticated){
        loginRedirect = <Redirect to='/' />
    }

    return (
        <form className={classes.LoginForm} onSubmit={onLoginHandler}>
            {loginRedirect}
            {form}
            <ErrorMessage type={props.error} />
            <Link to='/register'><p>Don't have an account? Register now!</p></Link>
            <button type="submit" name="submit">Log in</button>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);