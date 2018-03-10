import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
    return (
        <Aux>
            <Toolbar />
            <div className={classes.content}>
                {props.children}
            </div>
        </Aux>
    );
    
}

export default layout;