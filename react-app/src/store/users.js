const GET_USERS = 'albums/getUsers'

const getUsers = (payload) => {
    return {
        type: GET_USERS,
        payload
    }
}

export const fetchUsers = () => async (dispatch) => {
    const res = await fetch(`/api/users/`)

    const data = await res.json();
    dispatch(getUsers(data))
    return data;

}

const initialState = {
    users: {}
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:{
            return {
                users : action.payload
            }
        }
        default:
            return state;
    }
}

export default userReducer
