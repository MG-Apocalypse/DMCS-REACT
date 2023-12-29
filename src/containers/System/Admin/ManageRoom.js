import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions/"
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
                let labelName = `${item.firstName}`
                object.label = labelName;
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
        let { hasOldData } = this.state;
        this.props.saveDetailRoom({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            roomId: this.state.selectedRoom.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        console.log('check state: ', this.state)
    }

    handleChangeSelect = async (selectedRoom) => {
        this.setState({ selectedRoom });

        let res = await getDetailInforRoom(selectedRoom.value);
        if (res && res.errCode === 0 && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }
        console.log(`check res:`, res)

    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })

    }
    render() {
        let { hasOldData } = this.state
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
                            onChange={this.handleChangeSelect}
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
        allRooms: state.admin.allRooms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRooms: (id) => dispatch(actions.fetchAllRooms()),
        saveDetailRoom: (data) => dispatch(actions.saveDetailRoom(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoom);
