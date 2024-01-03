import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { fetchPhotos, fetchPhoto } from '../../store/photo';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchLikePhoto, fetchLikes, fetchUnlikePhoto } from '../../store/likes';
import { fetchComments } from '../../store/comments';

function PhotoById() {
    const { user_id, photo_id } = useParams();
    const [body, setBody] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const photo = useSelector((state) => state.photo.photo.Photo)
    const sessionUser = useSelector((state) => state.session.user);
    const comments = useSelector((state) => state.comments.comments)
    const likes = useSelector((state) => state.likes.likes)
    console.log('comments', comments)
    console.log('likes', likes)

    useEffect(() => {
        dispatch(fetchPhotos(user_id))
        dispatch(fetchPhoto(user_id,photo_id))
        dispatch(fetchLikes(photo_id))
        dispatch(fetchComments(photo_id))
    }, [dispatch, user_id, photo_id])

    const onLike = async (e) => {
        const likePhoto = await dispatch(fetchLikePhoto(photo_id, sessionUser.id))
    }

    const onDislike = async (e) => {
        const dislikePhoto = await dispatch(fetchUnlikePhoto(photo_id, sessionUser.id))
    }
    return photo && likes && comments ? (
        <>
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
        {!likes.find((like) => like.user_id === sessionUser.id) ?
            <div className='like-container'>
                <i className='fa-regular fa-thumbs-up' onClick={() => onLike()}></i>
            </div>
        :
            <div className='dislike-container'>
                <i className='fa-regular fa-thumbs-down' onClick={() => onDislike()}></i>
            </div>
        }
        </>
    ) : null
}

export default PhotoById
