import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import SingleBooksList from '../SingleBooksList/SingleBooksList';
import classes from './Home.module.css';

const Home = props => {
    const {onInitBooks, books, loading} = props;

    useEffect(() => {
        onInitBooks();
    }, [onInitBooks])

    let content;
    if(loading){
        content = <Spinner />
    }else{
        content = books.map(book => {
            return (
                    <SingleBooksList
                        key={book.list_name_encoded}
                        id={book.list_id}
                        name={book.display_name} 
                        img={book.list_image} />
                )
        })
    }
    return (
        <div className={classes.Home}>
            {content}
        </div>
        )
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBooks: () => dispatch(actions.getBooks()),
    }
}

const mapStateToProps = state => {
    return {
        books: state.books,
        loading: state.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);