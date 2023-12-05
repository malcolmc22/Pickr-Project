const GET_PHOTOS = 'photos/getPhotos'
const ADD_PHOTO = '/photos/addPhoto'

// Action Creator
const getPhotos = (payload) => {
    return {
        type: GET_PHOTOS,
        payload
    }
}

const addPhoto = (payload) => {
    return {
        type: ADD_PHOTO,
        payload
    }
}

// Thunks

export const fetchPhotos = (user_id) => async (dispatch) => {
    const res = await fetch(`/api/photos/${user_id}`)

    const data = await res.json();
    dispatch(getPhotos(data))
    return data;
}

export const fetchNewPhoto = (userId, payload) => async (dispatch) => {
    const res = await fetch(`/api/photos/${userId}`, {
        method: "POST",
        body: payload
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data, 'this is res')
    } else {
        console.log("there was an error making your post")
    }
}


// Reducer

const initialState = {
    photo : {},
    allPhotos : {}
}

export const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS:{
            return {
                ...state,
                allPhotos: action.payload
            }
        }
        default:
            return state;
    }
}

export default photoReducer
