import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        //event.proventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'John Doe',
                address: 'Test Street',
                phoneNumber: '123456789',
                email: 'john@doe.com'
            }
        };

        axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(response => {
            console.log(response);
            this.setState({loading: false});
        });
    }

    render () {
        let form = (
            <form>
                <input type='text' name='name' placeholder='Your Name' />
                <input type='email' name='email' placeholder='Your Email' />
                <input type='text' name='street' placeholder='Your Street' />
                <input type='text' name='post' placeholder='Your Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h3>Enter your contact information</h3>
                {form}
            </div>
        );
    }
}

export default ContactData;