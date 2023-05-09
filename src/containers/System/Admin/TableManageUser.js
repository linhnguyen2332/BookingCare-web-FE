import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { languages } from "../../../utils";
import * as actions from "../../../store/actions";
import './TableManageUser.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        };
    }



    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            let arrUsers = this.props.users
            this.setState({
                userRedux: arrUsers,

            })

        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)

    }

    render() {
        let arrUsers = this.state.userRedux;
        return (
            <React.Fragment>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            onClick={() => this.handleEditUser(item)}
                                            className='btn-edit' ><i className="fas fa-edit"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)} ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }


                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
