import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { Link, NavLink } from "react-router-dom";

class HomeHeader extends Component {
    render() {
        const { isLoggedIn, userInfo } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/HomeHeader';

        return (
            <React.Fragment>
                {this.props.isShowBanner === true &&

                    <div className='home-header-container'>
                        <div className='home-header-content'>
                            <div className='left-content'>
                                <div className='logo'></div>
                            </div>
                            <div className='right-content'></div>
                            <div className="topnav">
                                <NavLink to="/login?redirect=%2Fsystem%2Fuser-manage" activeClassName="active">
                                    <h1>Cá nhân</h1>
                                </NavLink>

                                <NavLink to="/contact" activeClassName="active">
                                    <h1>Liên Hệ</h1>
                                </NavLink>
                                <NavLink to="/roomlist" activeClassName="active">
                                    <h1>Đặt phòng</h1>
                                </NavLink>

                                <NavLink to="/home" activeClassName="active" exact={true}>
                                    <h1>Trang Chủ</h1>
                                </NavLink>

                            </div>

                        </div>
                    </div>
                }

            </React.Fragment>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
