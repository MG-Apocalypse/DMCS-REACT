import React, { Component } from 'react';
import { connect } from "react-redux";
import './EmployerSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleEmployerByDate } from '../../../services/userService';
class EmployerSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
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
        let res = await getScheduleEmployerByDate(39)
        this.setState({
            allDays: allDays,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeSelect = async (event) => {
        if (this.props.employerIdFromParent && this.props.employerIdFromParent !== -1) {
            let employerId = this.props.employerIdFromParent;
            let date = event.target.value
            let res = await getScheduleEmployerByDate(employerId, date);
            console.log('check res schedule: ', res)

        }
        console.log('date value: ', event.target.value)
    }

    render() {
        let { allDays } = this.state
        return (
            <div className='employer-schedule-container'>
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

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployerSchedule);
