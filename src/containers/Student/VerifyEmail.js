import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let roomId = urlParams.get('roomId');
            let res = await postVerifyBookAppointment({
                token: token,
                roomId: roomId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader isShowBanner={true} />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            Loadding data...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className='infor-booking'>Xác nhận thuê phòng thành công!</div>
                                :
                                <div className='infor-booking'>Thuê phòng không thành công hoặc đã được xác nhận!</div>
                            }

                        </div>
                    }
                </div>

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
