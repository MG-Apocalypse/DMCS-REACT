import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalUser.scss'

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: '',


        }
    }

    componentDidMount() {
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
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber',];
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

    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
    }

    resetFormAddNewUser() {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: ''
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
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
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
                                            name="phonenumber"
                                            onChange={(event) => this.handleOnChangeInput(event, 'phonenumber')}
                                            value={this.state.phonenumber}
                                        />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputState">Sex</label>
                                        <select
                                            name="gender"
                                            class="form-control"
                                            onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                        >
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputZip">Role</label>
                                        <select
                                            name="roleId"
                                            class="form-control"
                                            onChange={(event) => this.handleOnChangeInput(event, 'roleId')}
                                        >
                                            <option value="1">Admin</option>
                                            <option value="2">Doctor</option>
                                            <option value="3">Patient</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.handleAddNewUser() }}
                    >
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.resetFormAddNewUser() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




