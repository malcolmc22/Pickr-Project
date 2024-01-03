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

const likePhoto = (payload) => {
    return {
        type: LIKE_PHOTO,
        payload
    }
}

const deleteLike = (photo_id, user_id) => {
    return {
        type: DELETE_LIKE,
        photo_id,
        user_id
    }
}
// Thunks
export const fetchLikes = (photo_id) => async (dispatch) => {
    const res = await fetch(`/api/likes/${photo_id}`)

    const data = await res.json();
    dispatch(getLikes(data))
    return data;
}

export const fetchLikePhoto = (photo_id, user_id) => async (dispatch) => {
    const res = await fetch(`/api/likes/${photo_id}/${user_id}`, {
        method: "POST"
    })

    const data = await res.json();
    dispatch(likePhoto(data))
    return data
}

export const fetchUnlikePhoto = (photo_id, user_id) => async (dispatch) => {
    const res = await fetch(`/api/likes/${photo_id}/${user_id}`, {
        method: "DELETE"
    })

    const data = await res.json();
    dispatch(deleteLike(photo_id,user_id))
    return data
}

// Reducer
const initialState = {
    likes: []
}

export const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKES: {
            return {
                ...state,
                likes: action.payload
            }
        }
        case LIKE_PHOTO: {
            console.log('action', action.payload)
            console.log('state test', state)
            return {
                ...state,
                likes: [...state.likes, action.payload]
            }
        }
        case DELETE_LIKE: {
            console.log(state)
            const like = state.likes.find((like) => like.photo_id == action.photo_id && like.user_id == action.user_id)
            console.log(like, 'deleted like')
        }
        default:
            return state;
    }
}

export default likesReducer
