import React, { Component } from 'react';
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
                <Toolbar showSideDrawer={this.displaySideDrawer} />
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    hide={this.hideSideDrawer} />
                <div className={classes.content}>{this.props.children}</div>
            </Aux>
        );
    }
}

export default Layout;