import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
            })
        }
        console.log('didmout edit modal ', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check', this.state)

        })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber',];
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop', this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Miising parameter: ', +arrInput[i]);
                break;
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            // call api edit user mdodal
            this.props.editUser(this.state);
            console.log(this.state)
        }
    }



    resetFormAddNewUser() {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '1',
            roleId: '1',
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'abcClassName'}
                size='lg'

            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div class="container">
                        <div class="row">
                            <form action="/post-crud" method="POST">

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Email</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            name="email"
                                            placeholder="Email"
                                            onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                            value={this.state.email}
                                            disabled
                                        />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Password</label>
                                        <input type="password"
                                            class="form-control"
                                            name="password"
                                            placeholder="Password"
                                            onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                            value={this.state.password}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputFirstname4">First name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="firstName"
                                            placeholder="firstName"
                                            onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                            value={this.state.firstName}
                                        />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Last name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="lastName"
                                            placeholder="lastName"
                                            onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                            value={this.state.lastName}
                                        />
                                    </div>
                                </div>
                                <div class="form-row ">
                                    <div class="form-group col-md-12">
                                        <label for="inputAddress">Address</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="address"
                                            placeholder="1234 Main St"
                                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                            value={this.state.address}
                                        />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="inputCity">Phone number</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="+84-123-456-789"
                                            name="phoneNumber"
                                            onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                            value={this.state.phoneNumber}
                                        />
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleSaveUser() }}>
                        Save changes
                    </Button>
                    <Button
                        color="secondary"
                        className='px-3'
                        onClick={() => { this.resetFormAddNewUser() }}>
                        Reset
                    </Button>
                </ModalFooter>
            </Modal>)
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




