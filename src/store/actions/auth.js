import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return{
        type: actionTypes.LOGIN_START
    }
}

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    }
}

export const login = (email, password) => {
    return {
        type: actionTypes.LOGIN_USER,
        email: email,
        password: password
    }
}

export const register = (email, password) => {
    return {
        type: actionTypes.REGISTER_USER,
        email: email,
        password: password
    }
}

export const loginSuccess = (token, userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const registerSuccess = (email) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        email: email
    }
}

export const loginFail = (err) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: err
    }
}

export const registerFail = (err) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: err
    }
}

export const checkLoginTimeout = (expirationTime) => {
    return {
        type: actionTypes.CHECK_LOGIN_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const checkLoginState = () => {
    return {
        type: actionTypes.CHECK_LOGIN_STATE
    }
}

export const logout = () => {
    return {
        type: actionTypes.INITIATE_LOGOUT
    }
}

export const logoutSucced = () => {
    return {
        type: actionTypes.LOGOUT_SUCCEED
    }
}

export const setLoginhRedirectPath = (path) => {
    return {
        type: actionTypes.SET_LOGIN_REDIRECT_PATH,
        path: path
    }
};