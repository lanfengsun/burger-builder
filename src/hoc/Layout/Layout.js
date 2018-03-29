import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    hideSideDrawer = () => {
        this.setState({ showSideDrawer: false });
    }

    displaySideDrawer = () => {
        this.setState({ showSideDrawer: true });
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    showSideDrawer={this.displaySideDrawer} 
                    isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    hide={this.hideSideDrawer}
                    isAuthenticated={this.props.isAuthenticated} />
                <div className={classes.content}>{this.props.children}</div>
            </Aux>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);