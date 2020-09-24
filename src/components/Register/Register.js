import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../UI/Input/Input';
import * as actions from '../../store/actions/index';
import classes from '../Login/Login.module.css';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';

const Register = props => {
    const {onRegister, isRegistered} = props;

    const [registerForm, setRegisterForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '',
            touched: false,
            valid: false,
            validation: {
                isEmail: true,
                required: true
            }
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your password'
            },
            value: '',
            touched: false,
            valid: false,
            validation: {
                minLength: 6,
                required: true
            }
        },
        confirmPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm Your password'
            },
            value: '',
            touched: false,
            valid: false,
            validation: {
                minLength: true,
                required: true,
                isTheSame: true
            }
        },
    });

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

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.isTheSame){
            isValid = value === registerForm.password.value && isValid
        }

        return isValid;
    }

    const onChangedHandler = (e, inputName) => {
        const updatedInputs = updateObject(registerForm, {
            [inputName]: updateObject(registerForm[inputName], {
                value: e.target.value,
                valid: checkValidity(e.target.value, registerForm[inputName].validation),
                touched: true
            })
        })
        setRegisterForm(updatedInputs);
    }

    const formElementsArr = [];
    for(let key in registerForm){
        formElementsArr.push({
            id: key,
            config: registerForm[key]
        })
    }

    let formIsValid = null;
    const formIsValidCheck = [];
    formElementsArr.map(el => {
        if(el.config.valid){
            formIsValidCheck.push('good');
        }
    })

    if(formIsValidCheck.length === 3){
        formIsValid = true;
    }

    const onRegisterHandler = e => {
        e.preventDefault();
        if(formIsValid){
            onRegister(registerForm.email.value, registerForm.password.value);
        }
    }

    let form = formElementsArr.map(formEl => {
        return <Input 
            key={formEl.id}
            touched={formEl.config.touched}
            elementType={formEl.config.elementType}
            value={formEl.config.value}
            elementConfig={formEl.config.elementConfig}
            shouldValidate={formEl.config.validation}
            invalid={!formEl.config.valid}
            changed={(e) => onChangedHandler(e, formEl.id)}
        />
    })

    let registerRedirect = null;
    if(isRegistered){
        registerRedirect = <Redirect to={{pathname: '/registerSuccess', myProps: {email: registerForm.email.value}}} />
    }

    return (
        <div>
            <form className={classes.LoginForm} onSubmit={onRegisterHandler}>
                {registerRedirect}
                {form}
                <ErrorMessage type={props.error}/>
                {formIsValid ? <button type='submit'>Register</button> : <button type='submit' disabled>Register</button>}
                
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isRegistered: state.isRegistered,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (email, password) => dispatch(actions.register(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);