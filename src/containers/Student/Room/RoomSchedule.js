import React, { Component } from 'react';
import { connect } from "react-redux";
import './RoomSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleRoomByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
class RoomSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleModal: [],
        }
    }

    async componentDidMount() {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object)
        }
        let res = await getScheduleRoomByDate(39)
        this.setState({
            allDays: allDays,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        //     if (this.props.roomIdFromParent) {
        //         let allDays = []

        //         let res = await getScheduleRoomByDate(this.props.roomIdFromParent, allDays[0]);
        //         this.setState({
        //             allAvailableTime: res.data ? res.data : []
        //         })
        //     }
        //     this.setState({
        //     })
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.roomIdFromParent && this.props.roomIdFromParent !== -1) {
            let roomId = this.props.roomIdFromParent;
            let date = event.target.value
            let res = await getScheduleRoomByDate(roomId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log('check res schedule: ', res)

        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleModal: time
        })
    }

    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleModal } = this.state
        return (
            <>
                <div className='room-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='all-available-room'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span>Danh sách giường</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index) => {
                                    let timeDisplay = item.timeTypeData.valueEn
                                    return (
                                        <button key={index}
                                            onClick={() => this.handleClickScheduleTime(item)}
                                        >{timeDisplay}
                                        </button>
                                    )
                                })
                                :
                                <div className='no-schedule'>
                                    Hết chỗ !!</div>
                            }

                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingClose={this.closeBookingClose}
                    dataTime={dataScheduleModal}
                />
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomSchedule);
