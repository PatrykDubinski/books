import React from 'react';
import {Link} from 'react-router-dom';

import SideDrawerToggler from '../SideDrawer/SideDrawerToggler/SideDrawerToggler';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const toolbar = props => {
    return (
        <header className={classes.toolbarWrapper}>
            <SideDrawerToggler toggler={props.toggle}/>
            <div className={classes.Logo}>
                <Link to='/'><Logo /></Link>
            </div>
            <div className={classes.DesktopOnly}>
                <NavigationItems />
            </div>
        </header>
    )
};

export default toolbar;