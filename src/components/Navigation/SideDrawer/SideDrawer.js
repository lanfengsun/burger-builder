import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let attachedClasses = null;
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
    } else {
        attachedClasses = [classes.SideDrawer, classes.Close].join(' ');
    }

    return (
        <Aux>
            <Backdrop show={props.show} hide={props.hide} />
            <div className={attachedClasses}>
                <Logo height='10%' />
                <nav><NavItems /></nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;