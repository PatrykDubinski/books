import * as actionTypes from './actionTypes';

export const getBooks = () => {
    return {
        type: actionTypes.INIT_BOOKS
    }
}

export const getBooksSuccess = (books) => {
    return {
        type: actionTypes.INIT_BOOKS_SUCCESS,
        books: books
    }
}

export const getBooksFail = (error) => {
    return {
        type: actionTypes.INIT_BOOKS_FAIL,
        error: error
    }
}

export const likeBook = (isbn, likes) => {
    return {
        type: actionTypes.BOOK_LIKE_CHECK,
        isbn: isbn,
        likes: likes
    }
}