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
import { saveBulkScheduleEmployer } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEmployers: [],
            selectedEmployer: {},
            currentDate: '',
            rangeRoom: []
        }
    }

    componentDidMount() {
        this.props.fetchAllEmployers();
        this.props.fetchAllScheduleRoom()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allEmployers !== this.props.allEmployers) {
            let dataSelect = this.buildDataInputSelect(this.props.allEmployers)
            this.setState({
                listEmployers: dataSelect
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

    handleChangeSelect = async (selectedEmployer) => {
        this.setState({ selectedEmployer });

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
        let { rangeRoom, selectedEmployer, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error('invalid date!');
            return;
        }
        if (selectedEmployer && _.isEmpty(selectedEmployer)) {
            toast.error('invalid selected employer!');
            return;
        }
        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formattedDate = moment(currentDate).unix()
        let formatedDate = new Date(currentDate).getTime();

        if (rangeRoom && rangeRoom.length > 0) {
            let selectedRoom = rangeRoom.filter(item => item.isSelected === true)
            if (selectedRoom && selectedRoom.length > 0) {
                selectedRoom.map((schedule, index) => {
                    console.log('check schedule: ', schedule, index, selectedEmployer)
                    let object = {};
                    object.employerId = selectedEmployer.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Invalid selected room!")
                return;
            }
        }

        let res = await saveBulkScheduleEmployer({
            arrSchedule: result,
            employerId: selectedEmployer.value,
            formatedDate: formatedDate
        })

        if (res && res.errCode === 0) {
            toast.success('save saveBulkScheduleEmployer success')
        } else {
            toast.error('error saveBulkScheduleEmployer')
        }

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
                            <label><FormattedMessage id="manage-schedule.choose-employer" />
                            </label>
                            <Select
                                value={this.state.selectedEmployer}
                                onChange={this.handleChangeSelect}
                                options={this.state.listEmployers}
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
        allEmployers: state.admin.allEmployers,
        allScheduleRoom: state.admin.allScheduleRoom

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllEmployers: () => dispatch(actions.fetchAllEmployers()),
        fetchAllScheduleRoom: () => dispatch(actions.fetchAllScheduleRoom()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
