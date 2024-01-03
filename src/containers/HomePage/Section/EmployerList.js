import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import * as actions from "../../../store/actions"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router"

class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrEmployers: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.employerStudentRedux !== this.props.employerStudentRedux) {
            this.setState({
                arrEmployers: this.props.employerStudentRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadEmployerStudent();
    }

    handleViewDetailEmployer = (employer) => {
        console.log(`check employer`, employer)
        this.props.history.push(`/detail-employer/${employer.id}`)
    }

    handleViewRoom() {
        this.props.history.push(`/roomlist`)

    }

    render() {

        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        }

        let arrEmployers = this.state.arrEmployers;
        arrEmployers = arrEmployers.concat(arrEmployers)

        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-section'>Danh sách nhân viên</span>
                        <button className='btn-section'
                            onClick={() => this.handleViewRoom()}
                        >xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                            {arrEmployers && arrEmployers.length > 0
                                && arrEmployers.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    return (
                                        <div className='specialty-customize' key={index} onClick={() => this.handleViewDetailEmployer(item)}>
                                            <div className='employer-image'
                                                style={{ backgroundImage: `url(${imageBase64})` }}>
                                            </div>
                                            <div className='title-employer'>{item.firstName} {item.lastName}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        employerStudentRedux: state.admin.employerStudent
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadEmployerStudent: () => dispatch(actions.fetchEmployerStudent())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
