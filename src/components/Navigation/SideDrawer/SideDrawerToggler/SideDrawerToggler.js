import React from 'react';

import classes from './SideDrawerToggler.module.css';

const sideDrawerToggler = (props) => {
    return (
        <div onClick={props.toggler} className={classes.wrapper}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default sideDrawerToggler;