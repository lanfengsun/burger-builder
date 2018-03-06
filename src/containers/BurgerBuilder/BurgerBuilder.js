import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
       ingredients: {
           bacon: 0,
           salad: 0,
           cheese: 0,
           meat: 0
       }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>Ingredients Control</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;