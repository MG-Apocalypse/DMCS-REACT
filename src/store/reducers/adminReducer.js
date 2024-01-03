import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    employerStudent: [],
    allEmployers: [],
    allScheduleRoom: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];

            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_EMPLOYERS_STUDENT_SUCCESS:
            state.employerStudent = action.dataEmployer;
            return {
                ...state
            }

        case actionTypes.FETCH_EMPLOYERS_STUDENT_FAILED:
            state.employerStudent = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_EMPLOYERS_SUCCESS:
            state.allEmployers = action.dataRo;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_EMPLOYERS_FAILED:
            state.allEmployers = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_ROOM_SUCCESS:
            state.allScheduleRoom = action.dataRoom;
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_ROOM_FAILED:
            state.allScheduleRoom = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_ROOM_SUCCESS:
            return {
                ...state,
                rooms: action.rooms,
                isLoadingRooms: false,
            };

        case actionTypes.FETCH_ALL_ROOM_FAILED:
            return {
                ...state,
                isLoadingRooms: false,
            };

        case actionTypes.CREATE_ROOM_SUCCESS:
            return {
                ...state,
                isLoadingRooms: false,
            };

        case actionTypes.CREATE_ROOM_FAILED:
            return {
                ...state,
                isLoadingRooms: false,
            };
        default:
            return state;
    }
}

export default adminReducer;