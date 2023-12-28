import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils"
import './UserRedux.scss';
import { getAllCodeService } from '../../../services/userService';
import * as actions from "../../../store/actions/"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { before } from 'lodash';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // this.props.dispatch(actions.getGenderStart())
        try {
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
            let res1 = await getAllCodeService('position');
            if (res && res1.errCode === 0) {
                this.setState({
                    positionArr: res1.data
                })
            }
            let res2 = await getAllCodeService('role');
            if (res2 && res2.errCode === 0) {
                this.setState({
                    roleArr: res2.data
                })
            }
        } catch (e) {
            console.log(e)
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.genderRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''

            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.genderRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''

            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {

            let arrPositions = this.props.genderRedux;
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.genderRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''

            }, () => {
            })
        }

    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('check base64: ', base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux action
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber',
            'address',]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is required ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        },)
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isGetGenders = this.props.isLoadingGender

        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar
        } = this.state;
        return (
            <div className='user-redux-container'>
                <div className='user-redux-title'>
                    User Redux Apocalypse
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <form>
                            <div className='row'>
                                <div className='form-group col-md-12 my-3'><div>{isGetGenders === true ? 'Loading genders' : ''}</div> </div>

                                <div className='form-group col-md-12 my-3'>Thêm mới người dùng</div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4 " >Email</label>
                                    <input type="email"
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        class="form-control my-3"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    />
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputPassword4">Password</label>
                                    <input type="password"
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        class="form-control my-3"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    />
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">firstName</label>
                                    <input
                                        type="firstName"
                                        class="form-control my-3"
                                        placeholder="firstName"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                    />

                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">lastName</label>
                                    <input
                                        type="lastName"
                                        class="form-control my-3"
                                        placeholder="lastName"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                    />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Phone nummber</label>
                                    <input
                                        type="phoneNumber"
                                        class="form-control my-3"
                                        placeholder="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    />
                                </div>
                                <div class="form-group col-md-9">
                                    <label for="inputEmail4">Address</label>
                                    <input
                                        type="address"
                                        class="form-control my-3"
                                        placeholder="address"
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="genders">Gender</label>
                                    <select id="manage-user.gender"
                                        class="form-control my-3"
                                        value={gender}
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (<option key={index} value={item.keyMap}>{item.valueEn}</option>
                                                )
                                            })

                                        }
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="positions">Postion</label>
                                    <select id="manage-user.position"
                                        class="form-control my-3"
                                        value={position}
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (<option key={index} value={item.keyMap}>{item.valueEn}</option>
                                                )
                                            })

                                        }
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="roles">Role</label>
                                    <select id="manage-user.role"
                                        class="form-control my-3"
                                        value={role}
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}

                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (<option key={index} value={item.keyMap}>{item.valueEn}</option>
                                                )
                                            })

                                        }
                                    </select>
                                </div>
                                <div class="form-group col-md-3 ">
                                    <label for="inputZip">Avatar</label>
                                    <div>
                                        <input type="file" class="form-control my-3" id="previewIng" hidden

                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <label className='label-upload my-3' htmlFor='previewIng'>Loading image <i className='fas fa-upload'></i></label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>

                                </div>
                            </div>
                            <div className='form-row'>
                                <button
                                    type="button"
                                    class={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning my-3" : "btn btn-primary my-3"}
                                    onClick={() => this.handleSaveUser()}
                                >{this.state.action === CRUD_ACTIONS.EDIT ? "Save edit" : "Save user"}
                                </button>
                            </div>



                            {this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewImgURL}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                            <div className='form-row'>
                                <TableManageUser
                                    handleEditFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
