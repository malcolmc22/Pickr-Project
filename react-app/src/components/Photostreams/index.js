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
    const users = useSelector((state) => state.users.users.users)
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

    return  sessionUser && users ? (
        <>
        <div className='profile-info'>
            <div className='gradient-test'></div>
            <div className='user-info-container'>
                {/* <div className='profile-img'> */}

                {/* </div> */}
                <div className='profile-name'>{users.find((user) => user.id == user_id).first_name} {users.find((user) => user.id == user_id).last_name}</div>
                <div className='profile-email'>{users.find((user) => user.id == user_id).email}</div>
            </div>

        </div>
        <nav className='you-page-nav'>
            <div style={{borderBottom : '3px solid #0091DC'}}>
                <NavLink exact to={`/${user_id}/photostreams`} style={{color: 'black'}}>PhotoStream</NavLink>
            </div>
            <div>
                <NavLink exact to={`/${user_id}/albums`}>Albums</NavLink>
            </div>
        </nav>
        { sessionUser.id == user_id ?
        <div className='create-photo-button-container'><button className='create-photo-button' onClick={() => history.push(`/${sessionUser.id}/new-photostream`)}>Create Photo</button></div>
        :
        null
        }
        <div className='all-photos-container'>
            {photos?.map((photo) => (
                <div key={photo.id}>
                {/* <div>{photo.id}</div> */}
                <img  alt={photo.name} src={photo.photo_url} onClick={() => history.push(`/${sessionUser.id}/${photo.id}`)} />
                {/* <div className='photo-buttons-container'>
                    <div><button onClick={() => history.push(`/${sessionUser.id}/${photo.id}/update`)}>Update Photo</button></div>
                    <div><button onClick={() => history.push(`/${sessionUser.id}/${photo.id}/delete`)}>Delete Photo</button></div>
                </div> */}
                </div>
            ))}
        </div>
        <Landing />
        </>
    ) : null
}

export default PhotoStream
