import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    bacon: 0.6,
    salad: 0.8,
    cheese: 0.5,
    meat: 1.0
}

class BurgerBuilder extends Component {
    state = {
       ingredients: null,
       totalPrice: 6.6,
       isPurchasable: false,
       hasOrdered: false,
       loading: false,
       error: false
    }

    componentDidMount = () => {
        axios.get('/ingredients.json').then(res => {
            this.setState({ ingredients: res.data });
        }).catch(res => {
            this.setState({ error: true });
        });
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

    orderHandler = () => {
        this.setState({hasOrdered: true});
    }

    orderCancelHandler = () => {
        this.setState({hasOrdered: false});
    }

    orderContinueHandler = () => {
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'John Doe',
                address: 'Test Street',
                phoneNumber: '123456789',
                email: 'john@doe.com'
            }
        };

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, hasOrdered: false})
        })
        .catch(response => {
            console.log(response);
            this.setState({loading: false, hasOrdered: false})
        })
    }

    render() {
        const disabledBtn = {...this.state.ingredients};
        for (let key in disabledBtn) {
            disabledBtn[key] = disabledBtn[key] <= 0;
        }

        let burger = this.state.error ? <p>Cannot Fetch Ingredients...</p> : <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        disable={disabledBtn}
                        purchasable={this.state.isPurchasable}
                        order={this.orderHandler} />
                </Aux>
            );
            orderSummary = (
                <OrderSummary ingredients={this.state.ingredients} 
                              price={this.state.totalPrice} 
                              orderContinue={this.orderContinueHandler} 
                              orderCancel={this.orderCancelHandler} />
            );
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.hasOrdered} hide={this.orderCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);