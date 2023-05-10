import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getAllDoctorService, saveDetailDoctorService, getTopDoctorHomeService } from '../../services/userService';
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                console.log('check get state:', getState)
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error:', e);
        }
    }

}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                console.log('check get state:', getState)
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            dispatch(fetchPositionFail());
            console.log('fetchPosition Start error:', e);
        }
    }

}


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                console.log('check get state:', getState)
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            dispatch(fetchRoleFail());
            console.log('fetchRole Start error:', e);
        }
    }

}

export const creatNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('check data from service', res);
            if (res && res.errCode === 0) {
                toast.success("Created new user successfully");
                dispatch(saveUserSuccess(res.data))
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFail());
            }
        } catch (e) {
            toast.error("Create user failed");
            dispatch(saveUserFail());
            console.log('fetchRole Start error:', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            let res1 = await getTopDoctorHomeService('')
            console.log('check res1:', res1);
            if (res && res.errCode === 0) {
                // console.log('check get state:', getState)

                dispatch(fetchAllUserSuccess(res.users))
            } else {
                dispatch(fetchAllUserFail());
            }
        } catch (e) {
            dispatch(fetchAllUserFail());
            console.log('fetchAllUser Start error:', e);
        }
    }

}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})




export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            console.log('check data from service', res);
            if (res && res.errCode === 0) {
                toast.success("Deleted user successfully");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFail());
            }
        } catch (e) {
            toast.error("Delete user failed");
            dispatch(deleteUserFail());
            console.log('deleteFailed error:', e);
        }
    }
}

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            console.log('check data from service', res);
            if (res && res.errCode === 0) {
                toast.success("Update user successfully");
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Update user failed")
                dispatch(editUserFail());
            }
        } catch (e) {
            toast.error("Update user failed");
            dispatch(editUserFail());
            console.log('editFailed error:', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})



export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data,
                })
            } else {
                dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAIL })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_FAIL:', e)
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAIL })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save doctor successfully");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

                })
            } else {
                toast.error("Save doctor failed");
                dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAIL:', e)
            toast.error("Save doctor failed");
            dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL })
        }
    }
}