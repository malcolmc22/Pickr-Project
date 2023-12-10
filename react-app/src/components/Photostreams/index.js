import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { fetchPhotos } from '../../store/photo';
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import './photo.css'
import Landing from '../HomePage';

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
                    {/* <div>img here</div> */}
                </div>
                <div className='profile-name'>{sessionUser.first_name} {sessionUser.last_name}</div>
                <div className='profile-email'>{sessionUser.email}</div>
            </div>

        </div>
        <nav className='you-page-nav'>
            <NavLink exact to={`/${user_id}/photostreams`}>PhotoStream</NavLink>
            <NavLink exact to={`/${user_id}/albums`}>Albums</NavLink>
        </nav>
        <div className='create-photo-button-container'><button className='create-photo-button' onClick={() => history.push(`/${sessionUser.id}/new-photostream`)}>Create Photo</button></div>
        <div className='all-photos-container'>
            {photos?.map((photo) => (
                <div key={photo.id}>
                {/* <div>{photo.id}</div> */}
                <img  alt={photo.name} src={photo.photo_url} /*onClick={() => history.push(`/${sessionUser.id}/${photo.id}`)} */ />
                <div className='photo-buttons-container'>
                    <div><button onClick={() => history.push(`/${sessionUser.id}/${photo.id}/update`)}>Update Photo</button></div>
                    <div><button onClick={() => history.push(`/${sessionUser.id}/${photo.id}/delete`)}>Delete Photo</button></div>
                </div>
                </div>
            ))}
        </div>
        <Landing />
        </>
    )
}

export default PhotoStream
