const GET_PHOTOS = 'photos/getPhotos'
const ADD_PHOTO = '/photos/addPhoto'
const GET_PHOTO = '/photos/getPhoto'
const UPDATE_PHOTO = '/phhotos/updatePhoto'
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

const getPhoto = (payload) => {
    return {
        type: GET_PHOTO,
        payload
    }
}

const updatePhoto = (payload) => {
    return {
        type: UPDATE_PHOTO,
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

export const fetchPhoto = (user_id, photo_id) => async (dispatch) => {
    const res = await fetch(`/api/photos/${user_id}/${photo_id}`)
    // console.log('inside fetch')
    const data = await res.json();
    dispatch(getPhoto(data))
    return data;
}

export const fetchUpdatePhoto = (user_id, photo_id, payload) => async (dispatch) => {
    const res = await fetch(`/api/photos/${user_id}/${photo_id}`, {
        headers: {"Content-Type" : "application/json"},
        method: "PUT",
        body: JSON.stringify(payload)
    })

    const data = await res.json();
    dispatch(updatePhoto(data))
    return data;
}

export const fetchDeletePhoto = (user_id, photo_id) => async (dispatch) => {
    const res = await fetch(`/api/photos/${user_id}/${photo_id}`, {
        method: "DELETE"
    })

    const data = await res.json();
    return data
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
        case GET_PHOTO:{
            return {
                ...state,
                photo: action.payload
            }
        }
        default:
            return state;
    }
}

export default photoReducer
