import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getRoomStudentService,
    getAllRooms,
    saveDetailRoomService,
    createNewRoomService,
    getAllRoomsService,
    getAllSpecialty

} from "../../services/userService";
import { toast } from "react-toastify"

export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e)
        }
    }
}

export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new succeed")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e)
        }
    }
}

export const fetchAllUserStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            // let res1 = await getRoomStudentService(3);
            // console.log('check get room: ', res1)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                toast.error("Fetch all user error");
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            toast.error("Fetch all user error");
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserStart error', e)
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data
})

export const fetchAllUserFailed = () => ({
    type: 'FETCH_ALL_USER_FAILED',
})

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})

export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED'
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Delete the user error")
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error")
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the user succeed")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Edit the user error")
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Edit the user error")
            dispatch(editUserFailed());
            console.log('editUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchRoomStudent = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getRoomStudentService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ROOMS_STUDENT_SUCCESS,
                    dataRoom: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ROOMS_STUDENT_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ROOMS_STUDENT_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ROOMS_STUDENT_FAILED,
            })
        }
    }
}

export const fetchAllRooms = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllRooms('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_ROOMS_SUCCESS,
                    dataRo: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_ROOMS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_ROOMS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_ROOMS_FAILED,
            })
        }
    }
}

export const saveDetailRoom = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailRoomService(data)
            if (res && res.errCode === 0) {
                toast.success("Save infor detail room succeed!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_ROOM_SUCCESS,
                    dataRo: res.data
                })
            } else {
                toast.error("Save infor detail room error!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_ROOM_FAILED,
                })
            }
        } catch (e) {
            toast.error("Save infor detail room error!")
            console.log('SAVE_DETAIL_ROOM_FAILED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_ROOM_FAILED,
            })
        }
    }
}

export const fetchAllScheduleRoom = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('BED')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_ROOM_SUCCESS,
                    dataRoom: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_ROOM_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_ROOM_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_ROOM_FAILED,
            })
        }
    }
}


// UserRedux.js

export const createNewRoom = (data) => {
    return async (dispatch, getState) => {
        try {
            // Provide default values if certain fields are not present
            const { roomName, capacity, ...otherData } = data;
            const newData = {
                roomName: roomName || 'Default Room',
                capacity: capacity || 10,
                ...otherData,
            };

            let res = await createNewRoomService(newData);

            if (res && res.errCode === 0) {
                toast.success("Create a new room succeeded");
                dispatch(createRoomSuccess());
                dispatch(fetchAllRoomsStart());
            } else {
                dispatch(createRoomFailed());
            }
        } catch (e) {
            dispatch(createRoomFailed());
            console.log('createRoomFailed error', e);
        }
    };
};

const createRoomSuccess = () => ({
    type: actionTypes.CREATE_ROOM_SUCCESS,
});

const createRoomFailed = () => ({
    type: actionTypes.CREATE_ROOM_FAILED,
});

// roomAction.js


export const fetchAllRoomsStart = () => {
    return async (dispatch, getState) => {
        try {
            // Assuming you have an appropriate API endpoint for fetching all rooms
            const response = await getAllRoomsService();

            if (response && response.errCode === 0) {
                dispatch(fetchAllRoomsSuccess(response.rooms));
            } else {
                dispatch(fetchAllRoomsFailed());
            }
        } catch (error) {
            console.error('Error fetching all rooms:', error);
            dispatch(fetchAllRoomsFailed());
        }
    };
};

export const getRequiredRoomInfor = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_ROOM_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resMode = await getAllCodeService("MODEROOM");
            let resSpecialty = await getAllSpecialty();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resMode && resMode.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resMode: resMode.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchRequiredRoomInforSuccess(data))
            } else {
                dispatch(fetchRequiredRoomInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredRoomInforFailed());
            console.log('fetchRequiredRoomInforFailed error', e)
        }
    }
}

export const fetchRequiredRoomInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_ROOM_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredRoomInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_ROOM_INFOR_FAILED,
})


const fetchAllRoomsSuccess = (rooms) => ({
    type: actionTypes.FETCH_ALL_ROOM_SUCCESS,
    rooms,
});

const fetchAllRoomsFailed = () => ({
    type: actionTypes.FETCH_ALL_ROOM_FAILED,
});
