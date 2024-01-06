import { Modal } from "reactstrap";
import ProfileRoom from "../ProfileRoom"
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postStudentBookAppointment } from '../../../../services/userService';
import { Slide, toast } from "react-toastify"
import moment from 'moment';
import { connect } from "react-redux";
import React, { Component } from 'react';
import './BookingModal.scss'

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            genders: '',
            phoneNumber: '',
            email: '',
            address: '',
            zipStudent: '',
            selectedGender: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }

    builDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueVi;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.builDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let roomId = this.props.dataTime.roomId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    roomId: roomId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangeSelect = (selectedRoom) => {
        this.setState({ selectedGender: selectedRoom });
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();

        let res = await postStudentBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.fullName,
            email: this.state.email,
            address: this.state.address,
            zipStudent: this.state.zipStudent,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!')
        }
    }

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props
        let roomId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            roomId = dataTime.roomId
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin thuê phòng ở ktx</span>
                        <span
                            className='right'
                            onClick={closeBookingClose}
                        ><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='room-infor'>
                            <ProfileRoom
                                roomId={roomId}
                                isShowDescriptionRoom={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='price-room'>

                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ email</label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                ></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                ></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Ngày sinh</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Mã số sinh viên</label>
                                <input className='form-control'
                                    value={this.state.zipStudent}
                                    onChange={(event) => this.handleOnChangeInput(event, 'zipStudent')}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        >Xác nhận</button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingClose}
                        >Hủy</button>
                    </div>
                </div>

            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
