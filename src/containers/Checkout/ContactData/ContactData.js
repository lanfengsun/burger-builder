import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { validate, updateObject } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        formElems: {
            name: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Your Name',
                    value: ''
                },
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elemType: 'input',
                elemConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your Email',
                    value: ''
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                isValid: false,
                touched: false
            },
            address: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    name: 'address',
                    placeholder: 'Your Address',
                    value: ''
                },
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            postalCode: {
                elemType: 'input',
                elemConfig: {
                    type: 'text',
                    name: 'postalcode',
                    placeholder: 'Your Postal Code',
                    value: ''
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                isValid: false,
                touched: false,
                invalidString: 'Postal Code must contain at least 5 digits'
            },
            delivery: {
                elemType: 'select',
                elemConfig: {
                    options: ['Normal', 'Express'],
                    value: 'Normal'
                }
            }
        },
        isFormValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        const customer = {};
        for (let elem in this.state.formElems) {
            customer[elem] = this.state.formElems[elem].elemConfig.value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: customer,
            userID: this.props.userID
        };

        this.props.onPlaceOrder(order, this.props.token);
    }


    inputChangeHandler = (event, elem) => {
        const newFormElems = updateObject(this.state.formElems, {
            [elem]: updateObject(this.state.formElems[elem], {
                elemConfig: updateObject(this.state.formElems[elem].elemConfig, {
                    value: event.target.value
                }),
                touched: true,
                isValid: validate(event.target.value, this.state.formElems[elem].validation)
            })
        });

        let isFormValid = true;
        for (elem in newFormElems) {
            if (newFormElems[elem].validation && !newFormElems[elem].isValid) {
                isFormValid = false;
                break;
            }
        }
        this.setState({formElems: newFormElems, isFormValid: isFormValid});
    }

    render () {
        const formElemsArray = [];
        for (let elem in this.state.formElems) {
            const cur = this.state.formElems[elem];
            formElemsArray.push({
                key: elem,
                type: cur.elemType,
                config: cur.elemConfig,
                valid: cur.validation ? !cur.touched || cur.isValid : true,
                invalidString: cur.invalidString
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElemsArray.map(elem => (
                    <Input 
                        key={elem.key}
                        label={elem.key}
                        inputtype={elem.type}
                        config={{...elem.config}}
                        change={(event) => this.inputChangeHandler(event, elem.key)}
                        valid={elem.valid}
                        invalidString={elem.invalidString} />
                ))}
                <Button btnType='Success' disabled={!this.state.isFormValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
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

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
});

const mapDispatchToProps = dispatch => ({
    onPlaceOrder: (order, token) => dispatch(actions.placeOrder(order, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));