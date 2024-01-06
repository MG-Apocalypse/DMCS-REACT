import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getRoomStudentService = (limit) => {
    return axios.get(`/api/room-student?limit=${limit}`)
}

const getAllRooms = () => {
    return axios.get(`/api/get-all-rooms`)
}

const saveDetailRoomService = (data) => {
    return axios.post('/api/save-infor-rooms', data)
}

const getDetailInforRoom = (inputId) => {
    return axios.get(`/api/get-detail-room-by-id?id=${inputId}`)
}

const saveBulkScheduleRoom = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const createNewRoomService = async (roomData) => {
    try {
        // Assuming you have an appropriate API endpoint for creating rooms
        const response = await axios.post('/api/create-new-room', roomData);
        return response.data;
    } catch (error) {
        console.error('Error creating a new room:', error);
        throw error;
    }
};

const getAllRoomsService = async () => {
    try {
        // Assuming you have an appropriate API endpoint for fetching all rooms
        const response = await axios.get('/api/get-all-rooms');
        return response.data;
    } catch (error) {
        console.error('Error fetching all rooms:', error);
        throw error;
    }
};

const getScheduleRoomByDate = (roomId, date) => {
    return axios.get(`/api/get-schedule-room-by-date?roomId=${roomId}&date=${date}`)
}
const getExtraInforRoomById = (roomId, date) => {
    return axios.get(`/api/get-extra-infor-room-by-id?roomId=${roomId}`)
}

const getProfileRoomById = (roomId, date) => {
    return axios.get(`/api/get-profile-room-by-id?roomId=${roomId}`)
}

const postStudentBookAppointment = (data) => {
    return axios.post(`/api/student-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialty = (data) => {
    return axios.get(`/api/get-specialty`)
}

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getRoomStudentService,
    getAllRooms,
    saveDetailRoomService,
    getDetailInforRoom,
    saveBulkScheduleRoom,
    createNewRoomService,
    getAllRoomsService,
    getScheduleRoomByDate,
    getExtraInforRoomById,
    getProfileRoomById,
    postStudentBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById
};