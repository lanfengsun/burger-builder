import React from 'react';
import Aux from '../../hoc/Auxiliary'

const layout = (props) => {
    return (
        <Aux>
            <h1>Navigations</h1>
            <div>{props.children}</div>
        </Aux>
    );
    
}

export default layout;