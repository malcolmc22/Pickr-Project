import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos } from '../../store/photo';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAlbum, fetchAlbums } from '../../store/album';



function AlbumById() {
    const { user_id, album_id } = useParams();
    // console.log(user_id, 'userid')
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const photos = useSelector((state) => Object.values(state.photo.allPhotos)[0]);
    const albums = useSelector((state) => state.album.allAlbums.Albums)
    const album = useSelector((state) => state.album.album.Album)
    // console.log(album)
    let albumPhotos = [];
    if (photos) {
        photos.map((photo => {
          if (photo.album_id == album_id) {
            albumPhotos.push(photo)
          }
        }))
    }

    useEffect(() => {
        dispatch(fetchPhotos(user_id))
        dispatch(fetchAlbums(user_id))
        dispatch(fetchAlbum(user_id,album_id))
    }, [dispatch, user_id])

    return photos && album ? (
        <>
        <div className='back-to-albums-div' onClick={() => history.push(`/${album[0].user_id}/albums`)}><i className="fa-solid fa-arrow-left"></i> Back to Albums</div>
            <div className='album-by-id-container'>
                <img
                    alt="logo"
                    className="logo-image"
                    src="https://www.freeiconspng.com/thumbs/flickr-logo-png/flickr-logo-png-17.png"
                />
                <h1 className='album-name'>{album[0].name} </h1>
                {albumPhotos.length > 1 ? <h2>{albumPhotos.length} Photos</h2> : <h2>{albumPhotos.length} Photo</h2>}
            </div>
                    {albumPhotos.length ?(
                        <div className='all-photos-in-album-container'>
                            {/* {console.log(photos.length)} */}
                            {photos?.map((photo) => (
                                photo.album_id == album_id ? (
                                <div key={photo.id}>
                                {/* <div>{photo.id}</div> */}
                                <img  alt={photo.name} src={photo.photo_url} onClick={() => history.push(`/${sessionUser.id}/${photo.id}`)}/>
                                </div>) : null
                            ))}
                        </div>) :
                        <div className='album-by-id-container-no-photos'>
                            <h3>You have no photos inside of this album yet!</h3>
                        </div>}
        </>
    ) : null
}

export default AlbumById
