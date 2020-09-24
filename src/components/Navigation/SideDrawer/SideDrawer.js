import React from 'react';

import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.showSideDrawer){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <div onClick={props.toggle} className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
}

export default sideDrawer;