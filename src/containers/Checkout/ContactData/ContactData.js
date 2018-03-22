import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        formElems: {
            name: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Your Name'
                }
            },
            email: {
                elemType: 'input',
                elemConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your Email'
                }
            },
            address: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    name: 'address',
                    placeholder: 'Your Address'
                }
            },
            postalCode: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    name: 'postalcode',
                    placeholder: 'Your Postal Code'
                }
            },
            delivery: {
                elemType: 'select',
                elemConfig: {
                    options: ['Normal', 'Express']
                }
            }
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
        const formElemsArray = [];
        for (let elem in this.state.formElems) {
            formElemsArray.push({
                key: elem,
                type: this.state.formElems[elem].elemType,
                config: this.state.formElems[elem].elemConfig
            });
        }

        let form = (
            <form>
                {formElemsArray.map(elem => (
                    <Input key={elem.key} inputtype={elem.type} {...elem.config} />
                ))}
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