import React from 'react';

import classes from './Logo.module.css';

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src="https://static01.nyt.com/vi-assets/images/share/1200x1200_t.png" alt="LOGO" />
        </div>
    );
};

export default logo;