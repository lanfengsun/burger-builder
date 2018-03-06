import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) => {
    return (
        <div>
            <BuildControl label='cheese' />
        </div>
    )
}

export default buildControls;