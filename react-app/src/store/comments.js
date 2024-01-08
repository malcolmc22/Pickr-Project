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

const deleteComment = (photo_id, user_id, comment_id) => {
    return {
        type: DELETE_COMMENT,
        photo_id,
        user_id,
        comment_id
    }
}

const updateComment = (photo_id, user_id, comment_id, body) => {
    return {
        type: UPDATE_COMMENT,
        photo_id,
        user_id,
        comment_id,
        body
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

export const fetchDeleteComment = (photo_id, user_id, comment_id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${photo_id}/${user_id}/${comment_id}`, {
        method: "DELETE"
    })
    const data = await res.json();
    dispatch(deleteComment(photo_id,user_id,comment_id));
    return data;
}

export const fetchUpdateComment = (photo_id, user_id, comment_id, body) => async (dispatch) => {
    const res = await fetch(`/api/comments/${photo_id}/${user_id}/${comment_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            body
        })
    })

    const data = await res.json();
    dispatch(updateComment(photo_id,user_id,comment_id,body))
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
        case POST_COMMENT: {
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        }
        case DELETE_COMMENT: {
            const newState = {...state}
            const newComments = newState.comments
            const commentToDelete = newComments.find((comment) => comment.id == action.comment_id && comment.user_id == action.user_id && comment.photo_id == action.photo_id)

            for ( let i = 0; i < newComments.length; i++) {
                const currentComment = newComments[i];

                if (currentComment.id == commentToDelete.id) {
                    newComments.splice(i,1)
                }
            }

            return {
                ...state,
                comments: [...newComments]
            }
        }
        case UPDATE_COMMENT: {
            const newState = {...state}
            const newComments = newState.comments
            const commentToEdit = newComments.find((comment) => comment.id == action.comment_id && comment.user_id == action.user_id && comment.photo_id == action.photo_id)

            for ( let i = 0; i< newComments.length; i++) {
                const currentComment = newComments[i];

                if (currentComment.id == commentToEdit.id) {
                    currentComment.body = action.body
                }
            }

            return {
                ...state,
                comments: [...newComments]
            }
        }
        default:
            return state;
    }
}

export default commentsReducer
