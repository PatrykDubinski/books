import * as actionTypes from '../actions/actionTypes';

const initialState = {
    books: [],
    loading: false,
    error: false,
    reviews: [],
    likes: [],
    userId: null,
    token: null,
    authRedirectPath: '/',
    isRegistered: false
};

const initBooks = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const initBooksSuccess = (state, action) => {
    let updatedBooks = [];
    action.books.map(book => {
        return updatedBooks.push(book);
    })
    return {
        ...state,
        loading: false,
        books: updatedBooks
    }
}

const initBooksFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const initReviews = (state, action) => {
    return{
        ...state,
        loading: true
    }
}

const initReviewsSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        reviews: action.data
    }
}

const initReviewsFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const bookLikeToggle = (state, isbn) => {
    const likes = state.likes.push(isbn);
    return {
        ...state,
        likes: likes,
    }
}

const bookLikeRemove = (state, isbn) => {
    const index = state.likes.indexOf(isbn);
    console.log(index);
    const likes = state.likes.splice(index, 1);
    // likes = likes.splice(index, 1);
    return {
        ...state,
        likes: likes
    }
}

const bookLikeCheck = (state, action) => {
    const index = state.likes.findIndex(el => el === action.isbn);
    if(index === -1){
        bookLikeToggle(state, action.isbn);
    }else if(index !== -1){
        bookLikeRemove(state, action.isbn)
    }
}

const loginStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    }
}

const registerStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    }
}

const loginSuccess = (state, action) => {
    return {
        ...state,
        userId: action.userId,
        token: action.token,
        loading: false,
        error: null,
    }
}

const registerSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        isRegistered: true
    }
}

const loginFail = (state, action) => {
    return {
        ...state,
        error: action.error.message,
        loading: false
    }
}

const registerFail = (state, action) => {
    console.log(action);
    return {
        ...state,
        error: action.error.message,
        loading: false
    }
}

const registerReset = (state, action) => {
    return {
        ...state,
        isRegistered: false
    }
}

const logout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    }
}

const setAuthRedirectPath = (state, action) => {
    return {
        ...state,
        authRedirectPath: action.path
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INITIALIZE_REGISTER:
            return registerReset(state, action);
        case actionTypes.REGISTER_START:
            return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS:
            return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL:
            return registerFail(state, action);
        case actionTypes.SET_LOGIN_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        case actionTypes.LOGIN_START:
            return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state, action);
        case actionTypes.INITIATE_LOGOUT:
            return logout(state, action);
        case actionTypes.INIT_BOOKS:
            return initBooks(state, action);
        case actionTypes.INIT_BOOKS_SUCCESS:
            return initBooksSuccess(state, action);
        case actionTypes.INIT_BOOKS_FAIL:
            return initBooksFail(state, action);
        case actionTypes.INIT_REVIEWS:
            return initReviews(state, action);
        case actionTypes.INIT_REVIEWS_SUCCESS:
            return initReviewsSuccess(state, action);
        case actionTypes.INIT_REVIEWS_FAIL:
            return initReviewsFail(state, action);
        case actionTypes.BOOK_LIKE_CHECK:
            return bookLikeCheck(state, action);
        default:
            return state
    }
}

export default reducer