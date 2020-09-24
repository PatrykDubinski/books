import axios from 'axios';
import {put, call, delay} from 'redux-saga/effects';

import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga(action){
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'userId');
    yield call([localStorage, 'removeItem'], 'expirationTime');
    yield put(actions.logoutSucced());
}

export function* checkLoginTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* loginSaga(action){
    yield put(actions.loginStart());
    const loginData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxlqStfD6DerSibBjOmbF8gNgqqfA0wqk';
    try{
        const response = yield axios.post(url, loginData);
        const expDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        yield localStorage.setItem('expirationTime', expDate);
        yield put(actions.loginSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkLoginTimeout(response.data.expiresIn));
    }catch(err){
        yield put(actions.loginFail(err.response.data.error))
    }
    yield put({
        type: actionTypes.INITIALIZE_LOGIN
    })
}

export function* registerUserSaga(action){
    yield put(actions.registerStart());
    const registerData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxlqStfD6DerSibBjOmbF8gNgqqfA0wqk';
    try{
        const response = yield axios.post(url, registerData);
        yield put(actions.registerSuccess(response.data.email));
    }catch(error){
        yield put(actions.registerFail(error.response.data.error))
    }
    yield put({
        type: actionTypes.INITIALIZE_REGISTER
    })
}

export function* loginCheckStateSaga(action){
    const token = localStorage.getItem('token');
    if(!token){
        yield put(actions.logout());
    } else{
        const expirationDate = yield new Date(localStorage.getItem('expirationTime'));
        if(expirationDate <= new Date()){
            yield put(actions.logout());
        }else{
            const userId = localStorage.getItem('userId');
            yield put(actions.loginSuccess(token, userId))
            yield put(actions.checkLoginTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}