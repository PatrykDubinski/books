import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../store/actions/index';
import classes from './ListDetails.module.css';

const Book = props => {

    const {onInitBooks} = props;
    const id = +props.location.hash.replace('#', '');

    useEffect(() => {
        onInitBooks();
    }, [onInitBooks, props.likes]);

    let content = props.books.filter(book => book.list_id === id);

    const myBooks = content.map(el => el.books.map((final, i) => {
        console.log(final);
        const slug = final.title.toLowerCase().split(' ').join('-');
        return (
            <div className={classes.BookWrapper} key={i}>
                <h3>{final.title}</h3>
                <div className={classes.FlipCard}>
                    <div className={classes.FlipCardInner}>
                        <div className={classes.FlipCardFront}>
                            <img src={final.book_image} alt="Book" />
                        </div>
                        <div className={classes.FlipCardBack}>
                            <ul>
                                <li>Author: {final.author}</li>
                                <li>Rank: {final.rank}</li>
                                <li>Last Rank: {final.rank_last_week}</li>
                                <li>Weeks on list: {final.weeks_on_list}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Link to={{
                    pathname: '/' + slug,
                    state: {
                        id: id,
                        isbn: final.primary_isbn10
                    }
                }}>
                    <div className={classes.Button}>Details</div>
                </Link>
            </div>
        )
    })
    )

    return (
        <div className={classes.Wrapper}>
            {myBooks}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        books: state.books,
        likes: state.likes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBooks: () => dispatch(actions.getBooks()),
        onLikeBook: (id, list) => dispatch(actions.likeBook(id, list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);