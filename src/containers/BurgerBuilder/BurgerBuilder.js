import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    bacon: 0.6,
    salad: 0.8,
    cheese: 0.5,
    meat: 1.0
}

class BurgerBuilder extends Component {
    state = {
       ingredients: {
           bacon: 0,
           salad: 0,
           cheese: 0,
           meat: 0
       },
       totalPrice: 6.6,
       isPurchasable: false
    }

    addIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] += 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchasableHandler(newIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) return;

        const newIngredients = { ...this.state.ingredients };
        newIngredients[type] -= 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchasableHandler(newIngredients);
    }

    updatePurchasableHandler = (ingredients) => {
        const total = Object.values(ingredients).reduce((sum, num) => (sum + num), 0);
        this.setState({isPurchasable: total > 0});
    }

    render() {
        const disabledBtn = {...this.state.ingredients};
        for (let key in disabledBtn) {
            disabledBtn[key] = disabledBtn[key] <= 0;
        }

        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disable={disabledBtn}
                    purchasable={this.state.isPurchasable} />
            </Aux>
        )
    }
}

export default BurgerBuilder;