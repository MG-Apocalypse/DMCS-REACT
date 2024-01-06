import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader'
import RoomSchedule from '../Room/RoomSchedule'
import RoomExtraInfor from '../Room/RoomExtraInfor'
import ProfileRoom from '../Room/ProfileRoom'
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrRoomId: [],
            dataDetailSpecialty: {},
            listMode: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            let resMode = await getAllCodeService('MODEROOM')

            if (res && res.errCode === 0 && resMode && resMode.errCode === 0) {
                let data = res.data;
                let arrRoomId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.roomSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrRoomId.push(item.roomId)
                        })
                    }
                }

                let dataMode = resMode.data;
                if (dataMode && dataMode.length > 0) {
                    dataMode.unshift({
                        createAt: null,
                        keyMap: "ALL",
                        type: "MODEROOM",
                        valueEn: "ALL",
                        valueVi: "Mọi cơ sở"
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrRoomId: arrRoomId,
                    listMode: resMode.data ? dataMode : []
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrRoomId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.roomSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrRoomId.push(item.roomId)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrRoomId: arrRoomId
                })
            }
        }
    }

    render() {
        let { arrRoomId, dataDetailSpecialty, listMode } = this.state;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader isShowBanner={true} />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>


                            </div>
                        }
                    </div>
                    <div className='search-sp-room'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listMode && listMode.length > 0 && listMode.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    {arrRoomId && arrRoomId.length > 0 && arrRoomId.map((item, index) => {
                        return (
                            <div className='each-room' key={index}>
                                <div className='dt-content-left'>
                                    <div className='profile-room'>
                                        <ProfileRoom
                                            roomId={item}
                                            isShowDescriptionRoom={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                        />
                                    </div>
                                </div>
                                <div className='dt-conent-right'>
                                    <div className='room-schedule'>
                                        <RoomSchedule
                                            roomIdFromParent={item}
                                            key={index}
                                        />
                                    </div>
                                    <div className='room-extra-infor'>
                                        <RoomExtraInfor
                                            roomIdFromParent={item}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
