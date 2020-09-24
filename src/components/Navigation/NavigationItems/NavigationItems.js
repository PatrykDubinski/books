import React from 'react';
import {connect} from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    return (
            <ul className={classes.NavItems}>
                {props.isAuth ? <NavigationItem link='/logout'>Logout</NavigationItem> : <NavigationItem link='/login'>Log in</NavigationItem>}
            </ul>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.token !== null
    }
}

export default connect(mapStateToProps)(navigationItems);