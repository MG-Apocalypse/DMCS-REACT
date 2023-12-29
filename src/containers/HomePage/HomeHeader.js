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
                        <div className='left-content'>
                            <div className='logo'></div>
                        </div>
                        <div className='right-content'></div>
                        <div className="topnav">
                            <NavLink to="/user" activeClassName="active">
                                <h1>Thông tin</h1>
                            </NavLink>

                            <NavLink to="/about" activeClassName="active">
                                <h1>Liên Hệ</h1>
                            </NavLink>
                            <NavLink to="/roomlist" activeClassName="active">
                                <h1>Đặt Phòng</h1>
                            </NavLink>

                            <NavLink to="/home" activeClassName="active" exact={true}>
                                <h1>Trang Chủ</h1>
                            </NavLink>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                NỀN TẢNG CUNG CẤP
                            </div>
                            <div className='title2'>
                                CHỖ Ở TỐT NHẤT CHO SINH VIÊN
                            </div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input
                                    type='text'
                                    placeholder='Hãy tìm phòng phù hợp với bạn...'
                                ></input>
                            </div>
                        </div>


                    </div>}

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
