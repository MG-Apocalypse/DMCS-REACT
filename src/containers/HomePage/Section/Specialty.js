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
            arrRooms: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roomStudentRedux !== this.props.roomStudentRedux) {
            this.setState({
                arrRooms: this.props.roomStudentRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadRoomStudent();
    }

    handleViewDetailRoom = (room) => {
        console.log(`check room`, room)
        this.props.history.push(`/detail-room/${room.id}`)
    }

    render() {

        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SampleNextArrow />
        }

        let arrRooms = this.state.arrRooms;
        arrRooms = arrRooms.concat(arrRooms)

        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-section'>Phòng ở sinh viên</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                            {arrRooms && arrRooms.length > 0
                                && arrRooms.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    return (
                                        <div className='specialty-customize' key={index} onClick={() => this.handleViewDetailRoom(item)}>
                                            <div className='room-image'
                                                style={{ backgroundImage: `url(${imageBase64})` }}>
                                            </div>
                                            <div className='title-room'>{item.firstName}</div>
                                            <div className='title-room'>{item.lastName}</div>
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
        roomStudentRedux: state.admin.roomStudent
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadRoomStudent: () => dispatch(actions.fetchRoomStudent())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
