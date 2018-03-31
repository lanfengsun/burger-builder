import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
    state = {
       hasOrdered: false,
       loading: false
    }

    componentDidMount = () => {
        this.props.onInitIngredients();
    }

    isPurchasable = () => {
        const total = Object.values(this.props.ingredients).reduce((sum, num) => (sum + num), 0);
        return total > 0;
    }

    orderHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ hasOrdered: true });
        } else {
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    orderCancelHandler = () => {
        this.setState({hasOrdered: false});
    }

    orderContinueHandler = () => {
        this.props.onOrderContinued();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledBtn = {...this.props.ingredients};
        for (let key in disabledBtn) {
            disabledBtn[key] = disabledBtn[key] <= 0;
        }

        let burger = this.props.error ? <p>Cannot Fetch Ingredients...</p> : <Spinner />;
        let orderSummary = null;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        add={this.props.onAddIngredient}
                        remove={this.props.onRemoveIngredient}
                        price={this.props.price}
                        disable={disabledBtn}
                        purchasable={this.isPurchasable()}
                        order={this.orderHandler}
                        isAuthenticated={this.props.isAuthenticated} />
                </Aux>
            );
            orderSummary = (
                <OrderSummary ingredients={this.props.ingredients} 
                              price={this.props.price} 
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

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    onAddIngredient: (ing) => dispatch(actions.addIngredient(ing)),
    onRemoveIngredient: (ing) => dispatch(actions.removeIngredient(ing)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onOrderContinued: () => dispatch(actions.orderInit()),
    onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));