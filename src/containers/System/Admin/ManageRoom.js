import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions/"
import './ManageRoom.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

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
        }
    }

    componentDidMount() {
        this.props.fetchAllRooms()
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.firstName;
                object.value = item.id;
                result.push(object)
            })
            return result;

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRooms !== this.props.allRooms) {
            let dataSelect = this.buildDataInputSelect(this.props.allRooms)
            this.setState({
                listRooms: dataSelect
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
        console.log('check state: ', this.state)
    }

    handleChange = (selectedRoom) => {
        this.setState({ selectedRoom });
        // console.log(`Option selected:`, selectedRoom)

    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })

    }
    render() {
        return (
            <div className='manage-room-container'>
                <div className='manage-room-title'>
                    create a new information of room
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group pb-3'>
                        <label>Choose Room</label>
                        <Select
                            value={this.state.selectedRoom}
                            onChange={this.handleChange}
                            options={this.state.listRooms}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Information Introduction</label>
                        <textarea
                            className='form-control'
                            rows="4"
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='manage-room-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    className='save-content-room'
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    Save information
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allRooms: state.admin.allRooms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRooms: (id) => dispatch(actions.fetchAllRooms(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoom);
