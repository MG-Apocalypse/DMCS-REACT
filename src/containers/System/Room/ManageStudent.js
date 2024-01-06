import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageStudent.scss';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
class ManageStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDatePicker = (data) => {
        this.setState({
            currentDate: data[0]
        })
    }

    render() {
        return (
            <div className='manage-student-container'>
                <div className='m-p-title'>
                    Quản lý sinh viên thuê phòng ktx
                </div>
                <div className='manage-student-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày thuê</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className='col-12 table-manage-student'>
                        <table style={{ width: "100%" }}>
                            <tr>
                                <th>Tên</th>
                                <th colSpan="2">Số điện thoại</th>
                            </tr>
                            <tr>
                                <th>BillGates</th>
                                <th>BillGates</th>
                                <th>BillGates</th>

                            </tr>
                        </table>
                    </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);
