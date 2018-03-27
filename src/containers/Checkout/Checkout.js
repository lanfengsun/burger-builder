import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.push('/');
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact');
    }

    render () {
        const redirect = this.props.orderFinished ? <Redirect to='/orders' /> : null;

        return (
            <div>
                {redirect}
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.url + '/contact'} 
                    component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    orderFinished: state.order.orderFinished
});

export default connect(mapStateToProps)(Checkout);