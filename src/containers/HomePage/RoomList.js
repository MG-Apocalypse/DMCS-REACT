import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "./RoomList.css";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const roomsData = [
    {
        id: 1,
        title: "Phòng 12 sinh viên",
        mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg",
        image1:
            "https://vnuf.edu.vn/documents/4400543/9005923/ktx6.png?t=1538145156352",
        image2:
            "https://vnuf.edu.vn/documents/4400543/9005923/ktx6.png?t=1538145156352",
        price: "100,000đ / tháng",
    },
    {
        id: 2,
        title: "Phòng 10 sinh viên",
        mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg",
        image1:
            "https://ktx.humg.edu.vn/content/tintuc/PublishingImages/ktx-d3.2.jpg?RenditionID=1",
        image2:
            "https://ktx.humg.edu.vn/content/tintuc/PublishingImages/ktx-d3.2.jpg?RenditionID=1",
        price: "140,000đ / tháng",
    },
    {
        id: 3,
        title: "Phòng 8 sinh viên",
        mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg",
        image1: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong81.jpg",
        image2: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong8.jpg",
        price: "180,000đ / tháng",
    },
    {
        id: 4,
        title: "Phòng 6 sinh viên",
        mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong6.jpg",
        image1: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong61.jpg",
        image2: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong62.jpg",
        price: "240,000đ / tháng",
    },
    {
        id: 5,
        title: "Phòng 4 sinh viên",
        mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/4 khong ml.jpg",
        image1:
            "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/4%20khong%20ml1.jpg",
        price: "650,000đ  / tháng",
    },
    {
        id: 6,
        title: "Phòng 2 sinh viên",
        mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/IMG_8241.jpg",
        image1: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong2dv.jpg",
        image2: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong2dv.jpg",
        image3: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong2dv.jpg",
        price: "1,250,000đ  / tháng",
    },
];

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const history = useHistory();

    // gắn api dô cái useeffect này
    useEffect(() => {
        setRooms(roomsData);
    }, []);

    const handleRoomClick = (id) => {
        history.push(`/roominfo/${id}`);
    };

    return (
        <React.Fragment>
            <HomeHeader isShowBanner={true} />
            <div className='room-banner'>
                <div className='room-content-up'>
                    <div className='search'>
                        <i className='fas fa-search'></i>
                        <input
                            type='text'
                            placeholder='Hãy tìm phòng phù hợp với bạn...'
                        ></input>
                    </div>
                </div>


            </div>
            <div className="room-list">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className="room-item"
                        onClick={() => handleRoomClick(room.id)}
                    >
                        <img src={room.mainImg} alt={room.title} className="room-image" />
                        <h3>{room.title}</h3>
                        <p>{room.price}</p>
                    </div>
                ))}
            </div>
            <HomeFooter />
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);