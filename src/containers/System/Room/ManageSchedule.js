import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import { saveBulkScheduleRoom } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRooms: [],
            selectedRoom: {},
            currentDate: '',
            rangeRoom: []
        }
    }

    componentDidMount() {
        this.props.fetchAllRooms();
        this.props.fetchAllScheduleRoom()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRooms !== this.props.allRooms) {
            let dataSelect = this.buildDataInputSelect(this.props.allRooms)
            this.setState({
                listRooms: dataSelect
            })
        }
        if (prevProps.allScheduleRoom !== this.props.allScheduleRoom) {
            let data = this.props.allScheduleRoom
            if (data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false
                //     return item
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeRoom: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelName = `${item.firstName} ${item.lastName}`
                object.label = labelName;
                object.value = item.id;
                result.push(object)
            })
            return result;

        }
    }

    handleChangeSelect = async (selectedRoom) => {
        this.setState({ selectedRoom });
        console.log('show room: ', selectedRoom)

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnRoom = (room) => {
        let { rangeRoom } = this.state;
        if (rangeRoom && rangeRoom.length > 0) {
            rangeRoom = rangeRoom.map(item => {
                if (item.id === room.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeRoom: rangeRoom
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeRoom, selectedRoom, currentDate } = this.state;
        let result = [];

        if (!currentDate) {
            toast.error('Invalid date!');
            return;
        }

        if (_.isEmpty(selectedRoom)) {
            toast.error('Invalid selected room!');
            return;
        }

        let formatedDate = new Date(currentDate).getTime();

        if (rangeRoom && rangeRoom.length > 0) {
            let selectedRooms = rangeRoom.filter(item => item.isSelected === true);

            if (selectedRooms && selectedRooms.length > 0) {
                selectedRooms.map((schedule, index) => {
                    let object = {};
                    object.roomId = selectedRoom.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                });
            } else {
                toast.error("Invalid selected room!");
                return;
            }
        }

        let res = await saveBulkScheduleRoom({
            arrSchedule: result,
            roomId: selectedRoom.value,
            formatedDate: '' + formatedDate
        });

        if (res && res.errCode === 0) {
            toast.success('Save saveBulkScheduleRoom success');
        } else {
            toast.error('Error saveBulkScheduleRoom');
        }

        console.log('Check result: ', result);
    }


    render() {
        let { rangeRoom } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-room" />
                            </label>
                            <Select
                                value={this.state.selectedRoom}
                                onChange={this.handleChangeSelect}
                                options={this.state.listRooms}
                            />                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                // value={this.state.currentDate}
                                selected={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-room-container mt-3'>
                            {rangeRoom && rangeRoom.length > 0 &&
                                rangeRoom.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickBtnRoom(item)}
                                        >{item.valueEn}</button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12 mt-3'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allRooms: state.admin.allRooms,
        allScheduleRoom: state.admin.allScheduleRoom

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRooms: () => dispatch(actions.fetchAllRooms()),
        fetchAllScheduleRoom: () => dispatch(actions.fetchAllScheduleRoom()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
