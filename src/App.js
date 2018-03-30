import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import * as actions from './store/actions/index';

const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));
const AsyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthExpire();
  }

  render() {
    let routes = null;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={AsyncCheckout} />
          <Route path='/orders' component={AsyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={AsyncAuth} />
          <Redirect to='/' />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={AsyncAuth} />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onCheckAuthExpire: () => dispatch(actions.checkAuthExpire())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
