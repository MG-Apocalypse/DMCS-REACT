import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions/"

import './TableManageRoom.scss';


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
class TableManageRoom extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
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
        let arrUsers = this.state.userRedux;
        return (
            <React.Fragment>
                <div className='row col-md-12'>
                    <div className='form-row col-md-12'>
                        <table id="TableManageRoom">
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.firstName} </td>
                                        <td>{item.lastName} </td>
                                        <td>
                                            <button
                                                type='button'
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'
                                            ><i class="fas fa-pencil-alt"></i></button>
                                            <button
                                                type='button'
                                                onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete'
                                            ><i class="fas fa-trash"></i></button>
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
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageRoom);
