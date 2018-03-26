import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
       hasOrdered: false,
       loading: false,
       error: false
    }

    // componentDidMount = () => {
    //     axios.get('/ingredients.json').then(res => {
    //         this.setState({ ingredients: res.data });
    //     }).catch(res => {
    //         this.setState({ error: true });
    //     });
    // }

    isPurchasable = () => {
        const total = Object.values(this.props.ingredients).reduce((sum, num) => (sum + num), 0);
        return total > 0;
    }

    orderHandler = () => {
        this.setState({hasOrdered: true});
    }

    orderCancelHandler = () => {
        this.setState({hasOrdered: false});
    }

    orderContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledBtn = {...this.props.ingredients};
        for (let key in disabledBtn) {
            disabledBtn[key] = disabledBtn[key] <= 0;
        }

        let burger = this.state.error ? <p>Cannot Fetch Ingredients...</p> : <Spinner />;
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
                        order={this.orderHandler} />
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
    ingredients: state.ingredients,
    price: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
    onAddIngredient: (ing) => dispatch({type: actionTypes.ADD_INGREDIENT, ing: ing}),
    onRemoveIngredient: (ing) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ing: ing})
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));