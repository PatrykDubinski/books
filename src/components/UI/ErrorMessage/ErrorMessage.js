import React from 'react';

import classes from './ErrorMessage.module.css';

const ErrorMessage = props => {

    let msg = null;
    switch(props.type){
        case 'EMAIL_EXISTS':
            msg = <div className={classes.MessageWrapper}>
                <i className="fas fa-exclamation-circle"></i>
                <p>Podany email jest już przypisany do innego konta!</p>
            </div>
            break;
        case 'INVALID_PASSWORD':
            msg = <div className={classes.MessageWrapper}>
                <i className="fas fa-exclamation-circle"></i>
                <p>Podane hasło jest nieprawidłowe!</p>
            </div>
            break;
        case 'EMAIL_NOT_FOUND':
            msg = <div className={classes.MessageWrapper}>
                <i className="fas fa-exclamation-circle"></i>
                <p>Nie znaleziono takiego adresu email!</p>
            </div>
            break;   
        default:
            return msg; 
    }

    return (
        <div className={classes.Message}>
            {msg}
        </div>
    )
}

export default ErrorMessage;