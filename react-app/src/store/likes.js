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
