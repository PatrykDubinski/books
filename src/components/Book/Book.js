import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import classes from './Book.module.css';

const Book = props => {
    const {onInitBooks, onInitReviews, reviews, loading} = props;

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        onInitBooks();
        onInitReviews(props.location.state.isbn);
    }, [onInitBooks, onInitReviews, props.location.state.isbn])

    const favHandler = () => {
        //dodawanie do local storage
        setIsLiked(!isLiked);
    }

    const list = props.books.filter(book => book.list_id === props.location.state.id);

    let myBook = list.map(listEl => listEl.books.filter(el => {
        const title = el.title.toLowerCase().split(' ').join('-');
        if(props.match.params.slug === title){
            return el
        }
        return null
    }))

    let myReviews = <Spinner />

    if(!loading){
        // console.log(reviews);
        myReviews = reviews.map((rev, i) => {
            return (
                <div key={i} className={classes.Review}>
                    <div>
                        <p>{rev.summary}</p>
                        <div>
                            <p className={classes.author}>{rev.byline}</p>
                        </div>
                        <div>
                            <p className={classes.date}>{rev.publication_dt}</p>
                        </div>
                    </div>
                </div>
            )
        }
    )}


    const buyLinks = myBook.map(outside => outside.map(final => final.buy_links.map((el, i) => {
        return (
            <a href={el.url} key={i}><div className={classes.BuyBox}>
                <p>{el.name} | {( 5 + Math.random() * 10).toFixed(2)}$</p>
            </div></a>
        )
    })))

    let icon = <p onClick={favHandler}>Add to favourite <i className="far fa-heart"></i></p>;
    if(isLiked){
        icon = <p onClick={favHandler}>Remove from favourite <i className="fas fa-heart" style={{color: 'red'}}></i></p>;
    }
    
    myBook = myBook.map(outside => outside.map((final, i) => {
        return (
            <div key={i}>
                <div className={classes.SingleWrapper}>
                    <div className={classes.Left}>
                        <img src={final.book_image} alt="Book" />
                        <div>
                            {icon}
                        </div>
                    </div>
                    <div /*right*/>
                        <h2>{final.title}</h2>
                        <p className={classes.By}>{final.contributor}</p>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a nisl tincidunt neque mollis bibendum. Integer convallis non sem ac auctor. In eget eleifend leo. Ut finibus dui eu ullamcorper tempus. Fusce vehicula bibendum ipsum, vel maximus lectus aliquam ac. Vivamus interdum volutpat enim in sodales. Nunc finibus ultrices pellentesque. Fusce tincidunt est magna, a lacinia quam mollis nec. Donec et enim pretium, commodo dui quis, malesuada nunc. Donec porttitor efficitur bibendum. Curabitur metus risus, fringilla at commodo eu, ullamcorper vel urna. Aenean blandit ut diam eget faucibus.
                            </p>
                        </div>
                        <div className={classes.CopyWrapper}>
                            <h4>Get a copy</h4>
                            <div className={classes.GetCopy}>
                                {buyLinks}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.Reviews}>
                    {myReviews}
                </div>
            </div>
        )
    })) 
    return (
        <div className={classes.BookWrapper}>
            {myBook}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        books: state.books,
        reviews: state.reviews,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBooks: () => dispatch(actions.getBooks()),
        onInitReviews: (isbn) => dispatch(actions.initReviews(isbn)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);