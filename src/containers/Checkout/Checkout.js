import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const INGREDIENT_PRICES = {
    bacon: 0.6,
    salad: 0.8,
    cheese: 0.5,
    meat: 1.0
}
const BASE_PRICE = 6.6;

class Checkout extends Component {
    state = {
        ingredients: null,
        price: null
    }

    componentWillMount = () => {
        const query = queryString.parse(this.props.location.search);
        const ingredients = {};
        let price = BASE_PRICE;
        for(let i in query) {
            ingredients[i] = +query[i];
            price += INGREDIENT_PRICES[i] * query[i];
        }
        this.setState({ingredients: ingredients, price: price.toFixed(2)});
    }

    checkoutCancelledHandler = () => {
        this.props.history.push('/');
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.url + '/contact'} 
                    render={(props) => (
                        <ContactData 
                            {...props} 
                            ingredients={this.state.ingredients}
                            price={this.state.price} />)} />
            </div>
        )
    }
}

export default Checkout;