import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageEmployer.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforEmployer } from "../../../services/userService"
import { CRUD_ACTIONS } from '../../../utils/constant';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageEmployer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedEmployer: '',
            description: '',
            listEmployers: [],
            hasOldData: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllEmployers()
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelName = `${item.firstName} ${item.lastName}`
                object.label = labelName;
                object.value = item.id;
                result.push(object)
            })
            return result;

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allEmployers !== this.props.allEmployers) {
            let dataSelect = this.buildDataInputSelect(this.props.allEmployers)
            this.setState({
                listEmployers: dataSelect
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
        this.props.saveDetailEmployer({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            employerId: this.state.selectedEmployer.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        console.log('check state: ', this.state)
    }

    handleChangeSelect = async (selectedEmployer) => {
        this.setState({ selectedEmployer });

        let res = await getDetailInforEmployer(selectedEmployer.value);
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
            <div className='manage-employer-container'>
                <div className='manage-employer-title'>
                    create a new information of employer
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group pb-3'>
                        <label>Choose employer</label>
                        <Select
                            value={this.state.selectedEmployer}
                            onChange={this.handleChangeSelect}
                            options={this.state.listEmployers}
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
                <div className='manage-employer-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData === true ? 'save-content-employer' : 'create-content-employer'}
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
        allEmployers: state.admin.allEmployers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllEmployers: () => dispatch(actions.fetchAllEmployers()),
        saveDetailEmployer: (data) => dispatch(actions.saveDetailEmployer(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployer);
