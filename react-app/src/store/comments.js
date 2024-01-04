const GET_COMMENTS = 'comments/getComments';
const DELETE_COMMENT = 'comments/deleteComment';
const UPDATE_COMMENT = 'comments/updateComment';
const POST_COMMENT = 'comments/postComment';

// Action Creator
const getComments = (payload) => {
    return {
        type: GET_COMMENTS,
        payload
    }
}

const postComment = (payload) => {
    return {
        type: POST_COMMENT,
        payload
    }
}

// Thunks
export const fetchComments = (photo_id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${photo_id}`)

    const data = await res.json();
    dispatch(getComments(data))
    return data;
}

export const fetchNewComment = (body, photo_id, user_id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${photo_id}/${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            body
        })
    });

    const data = await res.json();
    dispatch(postComment(data))
    return data;
}

// Reducer
const initialState = {
    comments: []
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS: {
            return {
                ...state,
                comments: action.payload
            }
        }
        default:
            return state;
    }
}

export default commentsReducer
