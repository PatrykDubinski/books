import * as actionTypes from './actionTypes';

export const initReviews = (isbn) => {
    return {
        type: actionTypes.INIT_REVIEWS,
        isbn: isbn
    }
}

export const getReviewsSuccess = (data) => {
    return {
        type: actionTypes.INIT_REVIEWS_SUCCESS,
        data: data
    }
}

export const getReviewsFail = (err) => {
    return {
        type: actionTypes.INIT_REVIEWS_FAIL,
        error: err
    }
} 