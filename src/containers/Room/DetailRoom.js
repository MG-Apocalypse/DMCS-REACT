import React, { Component } from 'react';
import { connect } from "react-redux";

class DetailRoom extends Component {
    render() {


        const { DetailRoomMenuPath, isLoggedIn } = this.props;
        return (
            <di></di>
        );
    }
}

const mapStateToProps = state => {
    return {
        DetailRoomMenuPath: state.app.DetailRoomMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoom);
