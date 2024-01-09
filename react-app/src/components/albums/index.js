import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos } from '../../store/photo';
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAlbums } from '../../store/album';
import './album.css'
import Landing from '../HomePage';
function Albums() {
    const { user_id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    // const photos = useSelector((state) => Object.values(state.photo.allPhotos)[0]);
    const users = useSelector((state) => state.users.users.users)
    const albums = useSelector((state) => state.album.allAlbums.Albums)

    useEffect(() => {
        dispatch(fetchPhotos(user_id))
        dispatch(fetchAlbums(user_id))
    }, [dispatch, user_id])

    return sessionUser && users ? (
        <>
        <div className='profile-info'>
            <div className='user-info-container'>
                <div className='profile-img'>
                    {/* <div>img here</div> */}
                </div>
                <div className='profile-name'>{users.find((user) => user.id == user_id).first_name} {users.find((user) => user.id == user_id).last_name}</div>
                <div className='profile-email'>{users.find((user) => user.id == user_id).email}</div>
            </div>

        </div>
        <nav className='you-page-nav'>
            <NavLink exact to={`/${user_id}/photostreams`}>PhotoStream</NavLink>
            <NavLink exact to={`/${user_id}/albums`}>Albums</NavLink>
        </nav>
        { sessionUser.id == user_id ?
        <div className='create-album-button-container'><button className='create-album-button' onClick={() => history.push(`/${sessionUser.id}/albums/new-album`)}>Create Album</button></div>
        :
        null
        }
        {albums?.length && (
            <div className='all-albums-container'>
                {albums?.map((album) => (
                    <div key={album.id}>
                        <div className='album' onClick={()=> history.push(`/${sessionUser.id}/albums/${album.id}`)}><div className='album-name'>{album.name}</div></div>
                        {sessionUser.id == album.user_id ?
                        <div className='album-buttons-container'>
                            <div><button onClick={() => history.push(`/${sessionUser.id}/albums/${album.id}/update`)}>Update Album</button></div>
                            <div><button onClick={() => history.push(`/${sessionUser.id}/albums/${album.id}/delete`)}>Delete Album</button></div>
                        </div>
                        : null
                        }
                    </div>
                ))}
            </div>
        )}
        <Landing />
        </>
    ) : null
}

export default Albums
