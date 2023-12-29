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
};