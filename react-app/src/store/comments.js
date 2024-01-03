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

const initialState = {
    comments: {}
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
