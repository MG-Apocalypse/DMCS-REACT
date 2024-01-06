import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from "react-router-dom";

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, roomMenu, studentMenu } from './menuApp';
import './Header.scss';
import _ from 'lodash';
import { USER_ROLE } from '../../utils';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } if (role === USER_ROLE.ROOM) {
                menu = roomMenu;
            }
            if (role === USER_ROLE.STUDENT) {
                menu = studentMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, userInfo } = this.props;


        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <span className='welcome'>
                    Xin chào , {userInfo && userInfo.firstName ? userInfo.firstName : ''} {userInfo && userInfo.lastName ? userInfo.lastName : ''} !</span>

                <NavLink className="back-to-home" to="/home" activeClassName="active" exact={true}>
                    <span className='name-home'>Trang chủ</span>
                </NavLink>
                {/* nút logout */}

                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
