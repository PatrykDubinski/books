import {takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {getBooksSaga, getReviewsSaga} from './books';
import {loginSaga, logoutSaga, checkLoginTimeoutSaga, loginCheckStateSaga, registerUserSaga} from './auth';

export function* watchBooks(){
    yield takeEvery(actionTypes.INIT_BOOKS, getBooksSaga);
    yield takeEvery(actionTypes.INIT_REVIEWS, getReviewsSaga);
}

export function* watchAuth(){
    yield takeEvery(actionTypes.LOGIN_USER, loginSaga);
    yield takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.CHECK_LOGIN_TIMEOUT, checkLoginTimeoutSaga);
    yield takeEvery(actionTypes.CHECK_LOGIN_STATE, loginCheckStateSaga);
    yield takeEvery(actionTypes.REGISTER_USER, registerUserSaga);
}