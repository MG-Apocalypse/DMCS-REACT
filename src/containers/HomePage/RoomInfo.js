import React, { Component, Fragment } from 'react';
import HomeFooter from './HomeFooter';
import './RoomInfo.css'
import {
    Link, NavLink
} from "react-router-dom";

class RoomInfo extends Component {
    render() {
        // Your room data
        const roomsData = [
            // ... your room data ...
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

        document.addEventListener('DOMContentLoaded', function () {
            // Function Show Modal Buy Tickets (add class open to modal)
            const buyBtns = document.querySelectorAll('.js-buy-ticket');
            const modal = document.querySelector('.js-modal');
            const modalContainer = document.querySelector('.js-modal-container');
            const modalClose = document.querySelector('.js-modal-close');

            function showBuyTickets() {
                modal.classList.add('open');
            }

            function hideBuyTickets() {
                modal.classList.remove('open');
            }

            // Loop every button and listen for the "click" event
            buyBtns.forEach(function (buyBtn) {
                buyBtn.addEventListener('click', showBuyTickets);
            });

            // Listen for the "click" event on the close button
            modalClose.addEventListener('click', hideBuyTickets);

            // Listen for the "click" event on the modal background
            modal.addEventListener('click', hideBuyTickets);

            // Prevent clicks inside the modal from closing it
            modalContainer.addEventListener('click', function (event) {
                event.stopPropagation();
            });
        });

        // Get the id from route parameters
        const { id } = this.props.match.params;
        const room = roomsData.find((room) => room.id.toString() === id);

        if (!room) {
            return <div>Room not found</div>;
        }

        const otherImages = () => {
            const additionalImages = [];
            for (let i = 1; i <= 10; i++) {
                const imageKey = `image${i}`;
                if (room[imageKey]) {
                    additionalImages.push(
                        <img key={imageKey} src={room[imageKey]} alt={room.title} />
                    );
                }
            }
            return additionalImages;
        };

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='logo'></div>
                        </div>
                        <div className='right-content'></div>
                        <div className="topnav">
                            <NavLink to="/user" activeClassName="active">
                                <h1>Thông tin</h1>
                            </NavLink>

                            <NavLink to="/about" activeClassName="active">
                                <h1>Liên Hệ</h1>
                            </NavLink>
                            <NavLink to="/roomlist" activeClassName="active">
                                <h1>Đặt Phòng</h1>
                            </NavLink>

                            <NavLink to="/home" activeClassName="active" exact={true}>
                                <h1>Trang Chủ</h1>
                            </NavLink>
                        </div>
                    </div>
                </div>                <div>
                    <h1 className='room-title1'>{room.title}</h1>
                    <p className='price'>Price: {room.price}</p>
                    <div>
                        <img src={room.mainImg} alt={room.title} />
                    </div>
                    <div> {otherImages()}</div>
                </div>
                <button class="btn js-buy-ticket">Đặt Phòng Tại Đây</button>

                <h1 className='room-title2'>Các Phòng Khác: </h1>
                <div className="other-rooms">
                    {roomsData.map(
                        (otherRoom) =>
                            otherRoom.id !== room.id && (
                                <Link key={otherRoom.id} to={`/roominfo/${otherRoom.id}`}>
                                    <div className="room-item-info">
                                        <img
                                            src={otherRoom.mainImg}
                                            alt={otherRoom.title}
                                            style={{ width: "200px", height: "auto" }}

                                        />
                                        <p className='room-title3' >{otherRoom.title}</p>
                                    </div>
                                </Link>
                            )
                    )}
                </div>
                <div class="modal js-modal">
                    <div class="modal-container js-modal-container">
                        <div class="modal-close js-modal-close">
                            <i class="ti-close"></i>
                        </div>

                        <header class="modal-header">
                            <i class="modal-heading-icon ti-bag"></i>
                            Hãy kiểm tra lại thông tin nhé !
                        </header>

                        <div class="modal-body">
                            <label for="ticket-quantity" class="modal-label">
                                <i class="ti-shopping-cart"></i>
                                Mã số sinh viên
                            </label>
                            <input type="ticket-quantity" class="modal-input" placeholder="N22..." />

                            <label for="ticket-email" class="modal-label">
                                <i class="ti-user"></i>
                                Họ và tên
                            </label>
                            <input type="ticket-email" class="modal-input" placeholder="Huỳnh Hữu Trí" />

                            <button id="buy-tickets">
                                Đặt Phòng <i class="ti-check"></i></button>
                        </div>

                        <footer class="modal-footer">
                            <p class="modal-help"> <a href="">Cần hỗ trợ?</a></p>
                        </footer>
                    </div>

                </div>
                <HomeFooter />
            </React.Fragment>
        );
    }
}



export default RoomInfo;