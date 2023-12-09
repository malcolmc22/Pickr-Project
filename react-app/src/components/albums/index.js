import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos } from '../../store/photo';
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAlbums } from '../../store/album';
import './album.css'
import Landing from '../HomePage';
function Albums() {
    const { user_id } = useParams();
    // console.log(user_id, 'userid')
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const photos = useSelector((state) => Object.values(state.photo.allPhotos)[0]);
    const albums = useSelector((state) => state.album.allAlbums.Albums)

    // console.log(albums, 'albms')
    // console.log(photos,'phptos')
    useEffect(() => {
        dispatch(fetchPhotos(user_id))
        dispatch(fetchAlbums(user_id))
    }, [dispatch, user_id])

    return (
        <>
        <div className='profile-info'>
            <div className='user-info-container'>
                <div className='profile-img'>
                    <div>img here</div>
                </div>
                <div>user here</div>
                <div>email</div>
                <div>followers</div>
                <div>following</div>
            </div>
            <div>joined 2023</div>
        </div>
        <nav className='you-page-nav'>
            <NavLink exact to={`/${user_id}/photostreams`}>PhotoStream</NavLink>
            <NavLink exact to={`/${user_id}/albums`}>Albums</NavLink>
        </nav>
        <div className='create-album-button-container'><button className='create-album-button' onClick={() => history.push(`/${sessionUser.id}/albums/new-album`)}>Create Album</button></div>
        {albums?.length && (
            <div className='all-albums-container'>
                {albums?.map((album) => (
                    <div key={album.id}>
                        <div className='album' onClick={()=> history.push(`/${sessionUser.id}/albums/${album.id}`)}><div className='album-name'>{album.name}</div></div>
                        <div className='album-buttons-container'>
                            <div><button onClick={() => history.push(`/${sessionUser.id}/albums/${album.id}/update`)}>Update Album</button></div>
                            <div><button onClick={() => history.push(`/${sessionUser.id}/albums/${album.id}/delete`)}>Delete Album</button></div>
                        </div>
                    </div>
                ))}
            </div>
        )}
        <Landing />
        </>
    )
}

export default Albums
