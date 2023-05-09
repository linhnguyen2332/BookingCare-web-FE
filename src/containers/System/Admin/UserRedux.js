import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser'; 
import { Buffer } from 'buffer'
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
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

            action:'',
            userEditId: '',
        };
    }



    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         });
        //     }
        // } catch (e) {
        //     console.error(e);
        // }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders, 
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        //reset state after create
        if (prevProps.users !== this.props.users) {
            let arrUsers = this.props.users
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }


    }

    handleOnChangeImage = async(event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file);
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
        let {action} = this.state
        if (action === CRUD_ACTIONS.CREATE) {

            //fire redux action
            this.props.creatNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }
        
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            })
        }


        // setTimeout(()=>{
        //     this.props.fetchUserRedux()
        // }, 1000)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if(!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required:' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log('check input onchange', this.state)
        })
    }

    handleEditUserFromParent =(user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'Hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        // console.log('check genders', this.state.genderArr)
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

        console.log('check props from redux', this.props.genderRedux)
        return (
            <div className="user-redux-container" >
                <div className="title" >User Redux</div>
                <div>{isLoadingGender === true ? 'Loading genders' : ''}</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'><FormattedMessage id="manage-users.add" /></div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.email" /></label>
                                <input className='form-control' type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.password" /></label>
                                <input className='form-control' type="password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.first-name" /></label>
                                <input className='form-control' type="text"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.last-name" /></label>
                                <input className='form-control' type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.phone-number" /></label>
                                <input className='form-control' type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.address" /></label>
                                <input className='form-control' type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.gender" /></label>
                                <select className='form-control'

                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (

                                            <option key={index} value={item.key}>
                                                {language === languages.VI ? item.valueVi : item.valueEn}
                                                {/* {item.valueVi} */}
                                            </option>)
                                    })
                                    }

                                </select>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.role" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (

                                            <option key={index} value={item.key}>
                                                {language === languages.VI ? item.valueVi : item.valueEn}
                                                {/* {item.valueVi} */}
                                            </option>)
                                    })
                                    }

                                </select>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.position" /></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (

                                            <option key={index} value={item.key}>
                                                {language === languages.VI ? item.valueVi : item.valueEn}
                                                {/* {item.valueVi} */}
                                            </option>)
                                    })
                                    }

                                </select>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-users.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor="previewImg">Tải ảnh<i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                    <FormattedMessage id="manage-users.edit"/> : 
                                    <FormattedMessage id="manage-users.save"/>}</button>
                            </div>

                            <div className='col-12'>
                                <TableManageUser 
                                handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                action={this.state.action}/> 
                            </div>
                        </div>
                    </div>
                </div>
                                   

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        creatNewUser: (data)=> dispatch(actions.creatNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
