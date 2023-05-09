import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders:[],
    roles:[],
    positions:[],
    users: [],
    allDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            
            state.isLoadingGender = true;
            console.log('check fetch start', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data 
            console.log('check success', state)
            return {
  
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            
            state.isLoadingGender = false;
            state.genders = [];
            console.log('check failed', action)
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            
            state.positions = action.data
            console.log('check success', state)
            return {

                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:

           
            state.positons = [];
            console.log('check failed', action)
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            
            state.roles = action.data
            console.log('check success', state)
            return {

                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            console.log('check failed', action)
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:

            state.users = action.users
            console.log('check success', state)
            return {

                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = [];
            console.log('check failed', action)
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:

            state.allDoctors = action.dataDr
            console.log('check success', state)
            return {

                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctors = [];
            console.log('check failed', action)
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;