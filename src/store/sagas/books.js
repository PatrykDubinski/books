import {put} from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';
import * as actionTypes from '../actions/actionTypes';

export function* getBooksSaga(action){
    try{
        const response = yield axios.get('https://books-app.dev.with-datafire.io/overview');
        yield put(actions.getBooksSuccess(response.data.results.lists));
    }catch(err){
        yield put(actions.getBooksFail(err.message));
    }
    yield put({
        type: actionTypes.INITIALIZE_BOOKS
    })
}

export function* getReviewsSaga(action){
    try{
        const response = yield axios.get('https://books-app.dev.with-datafire.io/reviews?format=json&isbn=94124141');
        console.log(response);
        yield put(actions.getReviewsSuccess(response.data.results));
    }catch(err){
        yield put(actions.getReviewsFail(err.message))
    }
    yield put({
        type: actionTypes.INITIALIZE_REVIEWS
    })
}

export function* checkLikesSaga(action){
    try{
        yield put(actions.likeBook(action.id));
    }catch(err){

    }
    yield put({
        type: actionTypes.BOOK_LIKE_CHECK_INIT
    })
}