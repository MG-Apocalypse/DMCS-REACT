import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions/"

import './TableInforuser.scss';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
class TableInforuser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;

        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditFromParentKey(user)


    }

    render() {
        const { userInfo } = this.props;

        let arrUsers = this.state.userRedux;
        const filteredUsers = arrUsers.filter(user => user.roleId === userInfo.roleId);

        return (
            <React.Fragment>
                <div className='row col-md-12'>
                    <div className='form-row col-md-12'>
                        <table id="TableInforuser">
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {filteredUsers && filteredUsers.length > 0 && filteredUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email} </td>
                                        <td>{item.firstName} </td>
                                        <td>{item.lastName} </td>
                                        <td>{item.address} </td>
                                        <td>
                                            <button
                                                type='button'
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'
                                            ><i class="fas fa-pencil-alt"></i></button>

                                        </td>
                                    </tr>
                                )

                            })
                            }
                        </table>
                    </div>

                </div>


            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableInforuser);
