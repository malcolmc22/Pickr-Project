const GET_LIKES = 'likes/getLikes';
const DELETE_LIKE = '/likes/deleteLike';
const LIKE_PHOTO = '/likes/addLike';


// Action Creator
const getLikes = (payload) => {
    return {
        type: GET_LIKES,
        payload
    }
}

// Thunks
export const fetchLikes = (photo_id) => async (dispatch) => {
    const res = await fetch(`/api/likes/${photo_id}`)

    const data = await res.json();
    dispatch(getLikes(data))
    return data;
}

// Reducer
const initialState = {
    likes: {}
}

export const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKES: {
            return {
                ...state,
                likes: action.payload
            }
        }
        default:
            return state;
    }
}

export default likesReducer
