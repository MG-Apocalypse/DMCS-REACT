import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import {
    Link, NavLink
} from "react-router-dom";

class HomeHeader extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/HomeHeader';

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className="topnav">
                            <NavLink to="/" activeClassName="active" exact={true}>
                                Home
                            </NavLink>
                            <NavLink to="/todo" activeClassName="active">
                                Todos
                            </NavLink>
                            <NavLink to="/about" activeClassName="active">
                                About
                            </NavLink>
                            <NavLink to="/user" activeClassName="active">
                                User
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div></div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
