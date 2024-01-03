import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailEmployer.scss'
import { getDetailInforEmployer } from '../../../services/userService'
import EmployerSchedule from './EmployerSchedule';
class DetailEmployer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailEmployer: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforEmployer(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailEmployer: res.data
                })

            }

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        console.log(`state: `, this.state)
        let { detailEmployer } = this.state;
        return (
            <React.Fragment>
                <HomeHeader
                    isShowBanner={true}
                />
                <div className='employer-detail-container'>
                    <div className='intro-employer'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailEmployer.image})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {detailEmployer.firstName} {detailEmployer.lastName}
                            </div>
                            <div className='down'>
                                {detailEmployer && detailEmployer.Markdown && detailEmployer.Markdown.description &&
                                    <span>
                                        {detailEmployer.Markdown.description}
                                    </span>

                                }
                            </div>
                        </div>

                    </div>
                    <div className='schedule-employer'>
                        <div className='content-left'>
                            <EmployerSchedule
                                employerIdFromParent={detailEmployer && detailEmployer.id ? detailEmployer.id : -1}
                            />
                        </div>
                        <div className='content-right'></div>

                    </div>
                    <div className='detail-infor-employer'>
                        {detailEmployer && detailEmployer.Markdown && detailEmployer.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailEmployer.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className='comment-employer'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailEmployer);
