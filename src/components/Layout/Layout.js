import React from 'react';
import Aux from '../../hoc/Auxiliary'

const layout = (props) => {
    return (
        <Aux>
            <div>Navigations</div>
            <div>{props.children}</div>
        </Aux>
    );
    
}

export default layout;