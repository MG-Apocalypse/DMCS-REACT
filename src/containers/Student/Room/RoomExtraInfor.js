import React, { Component } from 'react';
import { connect } from "react-redux";
import './RoomExtraInfor.scss';
import { FormattedMessage } from 'react-intl';
import { getExtraInforRoomById } from '../../../services/userService';
import NumberFormat from 'react-number-format'
class RoomExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.roomIdFromParent) {
            let res = await getExtraInforRoomById(this.props.roomIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.roomIdFromParent && this.props.roomIdFromParent !== -1) {
            let res = await getExtraInforRoomById(this.props.roomIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        return (
            <div className='room-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-zip'>Mã phòng:</div>
                    <div className='name-room'>
                        {extraInfor && extraInfor.nameRoom ? extraInfor.nameRoom : ''}
                    </div>
                    <div className='detail-zip'>
                        {extraInfor && extraInfor.zipRoom ? extraInfor.zipRoom : ''}

                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>Giá phòng:
                            {extraInfor && extraInfor.priceIdData &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceIdData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'} />

                            }
                            <span className='detail' onClick={() => this.showHideDetailInfor(true)}>
                                Xem chi tiết
                            </span>
                        </div>

                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='detail-infor'>
                                <div className='price-room'>
                                    <span className='left'>Giá phòng</span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceIdData &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor.priceIdData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'} />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>Sinh viên có thể thanh toán chi phí bằng hình thức:
                                {extraInfor && extraInfor.paymentIdData ? extraInfor.paymentIdData.valueVi : ''}
                            </div>

                            <div className='hide-price'>
                                <span
                                    onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá
                                </span>
                            </div>
                        </>

                    }
                </div>


            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomExtraInfor);
