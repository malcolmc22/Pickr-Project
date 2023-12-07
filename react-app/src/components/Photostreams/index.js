import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { fetchPhotos } from '../../store/photo';
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function PhotoStream() {
    const { user_id } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const photos = useSelector((state) => Object.values(state.photo.allPhotos)[0]);
    const history = useHistory();
    // console.log(photos, 'photoz')
    // photos.map(photo => {
    //     console.log(photo, 'test')
    // })
    // console.log(user_id, 'userid')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPhotos(user_id))
    }, [dispatch, user_id])

    return  sessionUser && (
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
        <nav>
            <NavLink exact to={`/${user_id}/photostreams`}>PhotoStream</NavLink>
            <NavLink exact to={`/${user_id}/albums`}>Albums</NavLink>
        </nav>
        <div className='all-photos-container'>
            <div><button onClick={() => history.push(`/${sessionUser.id}/new-photostream`)}>Create Photo</button></div>
            {photos?.map((photo) => (
                <div key={photo.id}>
                <div>{photo.id}</div>
                <img  alt={photo.name} src={photo.photo_url} onClick={() => history.push(`/${sessionUser.id}/${photo.id}`)}/>
                <div><button onClick={() => history.push(`/${sessionUser.id}/${photo.id}/update`)}>Update Photo</button></div>
                <div><button onClick={() => history.push(`/${sessionUser.id}/${photo.id}/delete`)}>Delete Photo</button></div>
                </div>
            ))}
        </div>
        </>
    )
}

export default PhotoStream
