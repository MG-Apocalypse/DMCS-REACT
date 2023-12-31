import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import HomeBanner from './HomeBanner';
import RoomInforList from './Section/RoomInforList';
class HomePage extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/HomePage';

        return (
            <div className='main'>
                <HomeHeader isShowBanner={true} />
                <HomeBanner />
                <RoomInforList />
                <Specialty />
                <About />
                <HomeFooter />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
