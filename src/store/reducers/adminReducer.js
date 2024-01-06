import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    roomStudent: [],
    allRooms: [],
    allScheduleRoom: [],

    allRequiredRoomInfor: [],
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

        case actionTypes.FETCH_ROOMS_STUDENT_SUCCESS:
            state.roomStudent = action.dataRoom;
            return {
                ...state
            }

        case actionTypes.FETCH_ROOMS_STUDENT_FAILED:
            state.roomStudent = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_ROOMS_SUCCESS:
            state.allRooms = action.dataRo;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_ROOMS_FAILED:
            state.allRooms = [];
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

        case actionTypes.FETCH_REQUIRED_ROOM_INFOR_SUCCESS:
            state.allRequiredRoomInfor = action.data;
            console.log('>>> apocalypse: fetch required room data actions: ', action)
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_ROOM_INFOR_FAILED:
            state.allRequiredRoomInfor = [];
            return {
                ...state
            }
    }




}

export default adminReducer;