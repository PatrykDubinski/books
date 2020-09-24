import React, {useState} from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const toggleSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <React.Fragment>
            <Backdrop show={showSideDrawer} close={toggleSideDrawer}/>
            <Toolbar toggle={toggleSideDrawer} />
            <SideDrawer toggle={toggleSideDrawer} showSideDrawer={showSideDrawer}/>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
};

export default Layout;