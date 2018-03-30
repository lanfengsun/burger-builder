import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        if (!this.props.token) {
            this.props.history.push('/auth');
        } else {
            this.props.onFetchOrders(this.props.token, this.props.userID);
        }
    }

    render () {
        let orders = (
            this.props.orders.map(order => (
                <Order key={order.key} ingredients={order.ingredients} price={order.price} />
            ))
        );

        if (this.props.loading) {
            orders = <Spinner />
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userID) => dispatch(actions.fetchOrders(token, userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));