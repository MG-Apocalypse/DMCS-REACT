// roomAction.js

import { actionTypes } from './actionTypes'; // Adjust the path based on your actual file structure
import { getAllRoomsService } from '../../services/userService'; // Adjust the path based on your actual file structure

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

const fetchAllRoomsSuccess = (rooms) => ({
    type: actionTypes.FETCH_ALL_ROOM_SUCCESS,
    rooms,
});

const fetchAllRoomsFailed = () => ({
    type: actionTypes.FETCH_ALL_ROOM_FAILED,
});
