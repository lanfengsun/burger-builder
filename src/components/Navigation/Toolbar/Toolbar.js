import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle showSideDrawer={props.showSideDrawer} />
        <Logo height='80%' />
        <nav className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
)

export default toolbar;