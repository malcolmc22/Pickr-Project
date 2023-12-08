import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos } from '../../store/photo';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAlbums } from '../../store/album';



function AlbumById() {
    const { user_id, album_id } = useParams();
    // console.log(user_id, 'userid')
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const photos = useSelector((state) => Object.values(state.photo.allPhotos)[0]);
    const albums = useSelector((state) => state.album.allAlbums.Albums)

    useEffect(() => {
        dispatch(fetchPhotos(user_id))
        dispatch(fetchAlbums(user_id))
    }, [dispatch, user_id])

    return (
        <div>
        <div className='all-photos-container'>
            {photos?.map((photo) => (
                photo.album_id == album_id ? (
                <div key={photo.id}>
                <div>{photo.id}</div>
                <img  alt={photo.name} src={photo.photo_url} onClick={() => history.push(`/${sessionUser.id}/${photo.id}`)}/>
                <div><button onClick={() => history.push(`/${sessionUser.id}/${photo.id}/update`)}>Update Photo</button></div>
                <div><button onClick={() => history.push(`/${sessionUser.id}/${photo.id}/delete`)}>Delete Photo</button></div>
                </div>) : null
            ))}
        </div>
        </div>
    )
}

export default AlbumById
