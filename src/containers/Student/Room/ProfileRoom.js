import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileRoom.scss';
import { FormattedMessage } from 'react-intl';
import { getProfileRoomById } from '../../../services/userService';
import NumberFormat from 'react-number-format'
import _ from 'lodash';
import moment from 'moment';
import { Link } from "react-router-dom"

class ProfileRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInforRoom(this.props.roomId);
        this.setState({
            dataProfile: data
        })
    }

    getInforRoom = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileRoomById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.roomId !== prevProps.roomId) {
            this.getInforRoom(this.props.roomId)
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {

            let date = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
            return (
                <>
                    <div>{dataTime} - {date}</div>
                    <div>freeeeeeeeeeeeeeeeeee</div>
                </>
            )
        }
        return (
            <></>
        )
    }

    render() {
        let { dataProfile } = this.state;
        let { isShowDescriptRoom, dataTime, isShowPrice, isShowLinkDetail, roomId } = this.props;
        console.log('check state: ', this.state)
        return (
            <div className='profile-room-container'>
                <div className='intro-room'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''} )` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {dataProfile.positionId}, {dataProfile.firstName} {dataProfile.lastName}
                        </div>
                        <div className='down'>
                            {isShowDescriptRoom === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking()}
                                </>
                            }
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true &&
                    <div className='view-detail-room'>
                        <Link to={`/detail-room/${roomId}`}>Xem thêm</Link>
                    </div>
                }
                {isShowPrice === true &&
                    <div className='price-room'>
                        Giá phòng: {dataProfile && dataProfile.Room_Infor &&
                            <NumberFormat
                                className='currency'
                                value={dataProfile.Room_Infor.priceIdData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'} />
                        }
                    </div>
                }
                {dataProfile && dataProfile.Room_Infor &&
                    <NumberFormat
                        className='currency'
                        value={dataProfile.Room_Infor.priceIdData.valueVi}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'VND'} />
                }

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRoom);
