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

const getEmployerStudentService = (limit) => {
    return axios.get(`/api/employer-student?limit=${limit}`)
}

const getAllEmployers = () => {
    return axios.get(`/api/get-all-employers`)
}

const saveDetailEmployerService = (data) => {
    return axios.post('/api/save-infor-employers', data)
}

const getDetailInforEmployer = (inputId) => {
    return axios.get(`/api/get-detail-employer-by-id?id=${inputId}`)
}

const saveBulkScheduleEmployer = (data) => {
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

const getScheduleEmployerByDate = (employerId, date) => {
    return axios.get(`/api/get-schedule-employer-by-date?employerId=${employerId}&date=${date}`)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getEmployerStudentService,
    getAllEmployers,
    saveDetailEmployerService,
    getDetailInforEmployer,
    saveBulkScheduleEmployer,
    createNewRoomService,
    getAllRoomsService,
    getScheduleEmployerByDate
};