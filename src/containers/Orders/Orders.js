import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json').then(res => {
            const orders = [];
            for(let key in res.data) {
                orders.push({
                    key: key,
                    ingredients: res.data[key].ingredients,
                    price: res.data[key].price
                });
            }
            this.setState({loading: false, orders: orders});
        }).catch(err => {
            this.setState({loading: false});
        });
    }

    render () {
        const orders = (
            this.state.orders.map(order => (
                <Order key={order.key} ingredients={order.ingredients} price={order.price} />
            ))
        )
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);