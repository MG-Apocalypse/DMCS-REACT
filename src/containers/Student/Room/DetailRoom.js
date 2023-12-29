import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailRoom.scss'
import { getDetailInforRoom } from '../../../services/userService'
class DetailRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailRoom: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforRoom(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailRoom: res.data
                })

            }

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        console.log(`state: `, this.state)
        let { detailRoom } = this.state;
        return (
            <React.Fragment>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='room-detail-container'>
                    <div className='intro-room'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailRoom.image})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {detailRoom.firstName}
                                {detailRoom.lastName}                            </div>
                            <div className='down'>
                                {detailRoom && detailRoom.Markdown && detailRoom.Markdown.description &&
                                    <span>
                                        {detailRoom.Markdown.description}
                                    </span>

                                }
                            </div>
                        </div>

                    </div>
                    <div className='schedule-room'>

                    </div>
                    <div className='detail-infor-room'>
                        {detailRoom && detailRoom.Markdown && detailRoom.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailRoom.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className='comment-room'>

                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoom);
