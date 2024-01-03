import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeBanner.scss'
class HomeFooter extends Component {

    render() {
        return (
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
            </div>
        )


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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
