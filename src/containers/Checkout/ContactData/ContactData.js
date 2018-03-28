import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

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
            customer: customer
        };

        this.props.onPlaceOrder(order);
    }

    validate = (value, validation) => {
        if (!validation) return true;

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        if(validation.maxLength) {
            isValid = value.length <= validation.maxLength && isValid;
        }

        if (validation.isEmail) {
            isValid = value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) && isValid;
        }

        if (validation.isNumeric) {
            isValid = value.match(/^\d+$/) && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, elem) => {
        // deep copy elemConfig
        const newFormElems = {...this.state.formElems};
        const newFormElem = {...this.state.formElems[elem]};
        const newFormElemConfig = {...this.state.formElems[elem].elemConfig};

        newFormElemConfig.value = event.target.value;
        newFormElem.isValid = this.validate(newFormElemConfig.value, newFormElem.validation);
        if (newFormElem.validation) newFormElem.touched = true;
        newFormElem.elemConfig = newFormElemConfig;
        newFormElems[elem] = newFormElem;

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
    loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
    onPlaceOrder: (order) => dispatch(actions.placeOrder(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));