import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router';

import classes from './SingleBooksList.module.css';

const SingleBooksList = props => {

    const history = useHistory();
    return (
        <div className={classes.Book}>
            <h3>{props.name}</h3>
            <img src={props.img} alt="List" />
            <Link to={history.location.pathname + 'list#' + props.id}>
                <div className={classes.Button}>Check books</div>
            </Link>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(SingleBooksList);