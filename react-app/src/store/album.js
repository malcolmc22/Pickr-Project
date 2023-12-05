const GET_ALBUMS = 'albums/getAlbums'

// Action Creator
const getAlbums = (payload) => {
    return {
        type: GET_ALBUMS,
        payload
    }
}

// Thunks

export const fetchAlbums = (user_id) => async (dispatch) => {
    const res = await fetch(`/api/albums/${user_id}`)

    const data = await res.json();
    dispatch(getAlbums(data))
    return data;
}


// Reducer

const initialState = {
    album : {},
    allAlbums : {}
}

export const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS:{
            return {
                ...state,
                allAlbums: action.payload
            }
        }
        default:
            return state;
    }
}

export default albumReducer
