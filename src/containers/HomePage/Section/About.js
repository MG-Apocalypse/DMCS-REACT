import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss'

class About extends Component {

    render() {
        return (
            <div className='section-about'>
                <div className='section-about-header'>
                    Review ký túc xá sinh viên Học Viện Bưu Chính Viễn Thông (PTIT)
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%"
                            height="500px"
                            src="https://www.youtube.com/embed/8RWR5vJg8hQ"
                            title="PTIT View KTX"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Ký túc xá Học viện Công nghệ Bưu chính Viễn thông Cơ sở tại TP. Hồ Chí Minh nằm trong khuôn viên Cơ sở đào tạo tại TP. Thủ Đức,  số 97, đường Man Thiện, Phường Hiệp Phú, TP. Thủ Đức, TP. Hồ Chí Minh.

                            Ký túc xá có 97 phòng dịch vụ với sức chứa gần 1.000 sinh viên. Là một trong số ít ký túc xá sinh viên tại TP. Thủ Đức nói riêng và TP. Hồ Chí Minh nói chung nằm cạnh các tòa nhà giảng đường, khu thực hành, thí nghiệm; có khuôn viên cây xanh, sân chơi thể thao thuận tiện cho sinh viên sinh hoạt, học tập và rèn luyện.

                            Tiếp giáp với Khu Công nghệ cao TP. Hồ Chí Minh, gần Trung tâm thương mại lớn nhất TP. Thủ Đức, sinh viên ở tại Ký túc xá có cơ hội trải nghiệm học tập, làm thêm, vui chơi giải trí hữu ích.</p>
                    </div>
                </div>
            </div>
        )


    }


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

export default connect(mapStateToProps, mapDispatchToProps)(About);
