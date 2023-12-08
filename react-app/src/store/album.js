const GET_ALBUMS = 'albums/getAlbums'
const GET_ALBUM = 'albums/getAlbum'
// Action Creator
const getAlbums = (payload) => {
    return {
        type: GET_ALBUMS,
        payload
    }
}

const getAlbum = (payload) => {
    return {
        type: GET_ALBUM,
        payload
    }
}

// Thunks

export const fetchAlbum = (user_id, album_id) => async (dispatch) => {
    const res = await fetch (`/api/albums/${user_id}/${album_id}`)

    const data = await res.json();
    dispatch(getAlbum(data))
    return data;

}
export const fetchAlbums = (user_id) => async (dispatch) => {
    const res = await fetch(`/api/albums/${user_id}`)

    const data = await res.json();
    dispatch(getAlbums(data))
    return data;
}

export const fetchDeleteAlbum = (user_id, album_id) => async (dispatch) => {
    const res = await fetch(`/api/albums/${user_id}/${album_id}`, {
        method: "DELETE"
    })

    const data = await res.json();
    return data
}

export const fetchUpdateAlbum = (user_id, album_id, payload) => async (dispatch) => {
    const res = await fetch(`/api/albums/${user_id}/${album_id}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })


    const data = await res.json();
    return data
}

export const fetchCreateAlbum = (user_id, payload) => async (dispatch) => {
    const res = await fetch(`/api/albums/${user_id}`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })

    const data = await res.json();
    return data;
}

export const fetchAddPhotoToAlbum = (user_id, album_id, photo_id) => async (dispatch) => {
    const res = await fetch(`/api/albums/${user_id}/${album_id}/add/${photo_id}`,{
        method: "PUT"
    })

    const data = await res.json();
    return data
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
        case GET_ALBUM:{
            return {
                ...state,
                album: action.payload
            }
        }
        default:
            return state;
    }
}

export default albumReducer
