import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { fetchPhotos, fetchPhoto } from '../../store/photo';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function PhotoById() {
    const { user_id, photo_id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const photo = useSelector((state) => state.photo.photo.Photo)
    const sessionUser = useSelector((state) => state.session.user);

    // console.log(photo)
    useEffect(() => {
        dispatch(fetchPhotos(user_id))
        dispatch(fetchPhoto(user_id,photo_id))
    }, [dispatch, user_id])
    return photo ? (
        <div className='photo-by-id-container'>
            <img
        alt="logo"
        className="logo-image"
        src="https://www.freeiconspng.com/thumbs/flickr-logo-png/flickr-logo-png-17.png"
      />
      <h1>Viewing {photo[0].title}</h1>
      <img  alt={photo[0].name} src={photo[0].photo_url}  />
                <div className='photo-buttons-container'>
                    <div><button onClick={() => history.push(`/${sessionUser.id}/${photo[0].id}/update`)}>Update Photo</button></div>
                    <div><button onClick={() => history.push(`/${sessionUser.id}/${photo[0].id}/delete`)}>Delete Photo</button></div>
                </div>
        </div>
    ) : null
}

export default PhotoById
