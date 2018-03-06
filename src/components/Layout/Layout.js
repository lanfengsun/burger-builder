import React from 'react';
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.css'

const layout = (props) => {
    return (
        <Aux>
            <h1>Navigations</h1>
            <div className={classes.content}>
                {props.children}
            </div>
        </Aux>
    );
    
}

export default layout;