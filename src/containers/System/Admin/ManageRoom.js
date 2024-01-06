import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageRoom.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforRoom } from "../../../services/userService"
import { CRUD_ACTIONS } from '../../../utils/constant';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageRoom extends Component {


    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedRoom: '',
            description: '',
            listRooms: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listMode: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedMode: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameRoom: '',
            zipRoom: '',
            note: '',
            clinicId: '',
            specialtyId: '',

        }
    }

    componentDidMount() {
        this.props.fetchAllRooms();
        this.props.getAllRequiredRoomInfor()
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === "ROOMS") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelName = `${item.firstName} ${item.lastName}`;
                    object.label = labelName;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelName = `${item.valueVi} USD`;
                    object.label = labelName;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "PAYMENT" || type === "MODEROOM") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelName = `${item.valueVi}`;
                    object.label = labelName;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "SPECIALTY") {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRooms !== this.props.allRooms) {
            let dataSelect = this.buildDataInputSelect(this.props.allRooms, 'ROOMS')
            this.setState({
                listRooms: dataSelect
            })
        }
        if (prevProps.allRequiredRoomInfor !== this.props.allRequiredRoomInfor) {
            let { resPayment, resPrice, resMode, resSpecialty } = this.props.allRequiredRoomInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectMode = this.buildDataInputSelect(resMode, "MODEROOM")
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY")

            console.log('apocalypse: data new: ', dataSelectPrice, dataSelectPayment, dataSelectMode)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listMode: dataSelectMode,
                listSpecialty: dataSelectSpecialty
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailRoom({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            roomId: this.state.selectedRoom.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedMode: this.state.selectedMode.value,
            nameRoom: this.state.nameRoom,
            zipRoom: this.state.zipRoom,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    handleChangeSelect = async (selectedRoom) => {
        this.setState({ selectedRoom });
        let { listMode, listPayment, listPrice, listSpecialty } = this.state;
        let res = await getDetailInforRoom(selectedRoom.value);
        if (res && res.errCode === 0 && res.data.Markdown) {
            let markdown = res.data.Markdown;


            let zipRoom = '',
                nameRoom = '',
                note = '',
                paymentId = '',
                priceId = '',
                modeId = '',
                specialtyId = '',
                selectedPayment = '',
                selectedMode = '',
                selectedPrice = '',
                selectedSpecialty = ''

            if (res.data.Room_Infor) {
                zipRoom = res.data.Room_Infor.zipRoom;
                nameRoom = res.data.Room_Infor.nameRoom;
                note = res.data.Room_Infor.note;
                paymentId = res.data.Room_Infor.paymentId;
                priceId = res.data.Room_Infor.priceId;
                modeId = res.data.Room_Infor.modeId;
                specialtyId = res.data.Room_Infor.specialtyId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedMode = listMode.find(item => {
                    return item && item.value === modeId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                zipRoom: zipRoom,
                nameRoom: nameRoom,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedMode: selectedMode,
                selectedSpecialty: selectedSpecialty,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                zipRoom: '',
                nameRoom: '',
                note: '',
                paymentId: '',
                priceId: '',
                modeId: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedSpecialty: ''
            })
        }

    };

    handleChangeSelectRoomInfor = (selectedRoom, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedRoom;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })

    }
    render() {
        let { hasOldData } = this.state
        return (
            <div className='manage-room-container'>
                <div className='manage-room-title'>
                    create more information of room
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group pb-3'>
                        <label>Choose room</label>
                        <Select
                            value={this.state.selectedRoom}
                            onChange={this.handleChangeSelect}
                            options={this.state.listRooms}
                            placeholder={'304...'}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Information Introduction</label>
                        <textarea
                            className='form-control'
                            rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Choose price</label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectRoomInfor}
                            options={this.state.listPrice}
                            placeholder={'304...'}
                            name="selectedPrice"

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Choose payment methods</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectRoomInfor}
                            options={this.state.listPayment}
                            placeholder={'304...'}
                            name="selectedPayment"
                        />                    </div>
                    <div className='col-4 form-group'>
                        <label>Choose mode</label>
                        <Select
                            value={this.state.selectedMode}
                            onChange={this.handleChangeSelectRoomInfor}
                            options={this.state.listMode}
                            placeholder={'304...'}
                            name="selectedMode"


                        />                    </div>
                    <div className='col-4 form-group'>
                        <label>Name room</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameRoom')}
                            value={this.state.nameRoom}                        >
                        </input>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Zip room</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'zipRoom')}
                            value={this.state.zipRoom}></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}></input>
                    </div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label>Chọn dịch vụ</label>
                            <Select
                                value={this.state.selectedSpecialty}
                                options={this.state.listSpecialty}
                                placeholder={'phòng có máy....'}
                                onChange={this.handleChangeSelectRoomInfor}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn dịch vụ</label>
                            <Select
                                value={this.state.selectedClinic}
                                options={this.state.listClinic}
                                placeholder={'phòng có máy....'}
                                onChange={this.handleChangeSelectRoomInfor}
                                name='selectedClinic'
                            />
                        </div>
                    </div>

                </div>
                <div className='manage-room-editor'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData === true ? 'save-content-room' : 'create-content-room'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ?
                        <span>Save information</span> : <span>Create information</span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allRooms: state.admin.allRooms,
        allRequiredRoomInfor: state.admin.allRequiredRoomInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRooms: () => dispatch(actions.fetchAllRooms()),
        getAllRequiredRoomInfor: () => dispatch(actions.getRequiredRoomInfor()),
        saveDetailRoom: (data) => dispatch(actions.saveDetailRoom(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoom);
