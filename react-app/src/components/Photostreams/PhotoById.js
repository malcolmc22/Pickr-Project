import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { fetchPhotos, fetchPhoto } from '../../store/photo';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchLikePhoto, fetchLikes, fetchUnlikePhoto } from '../../store/likes';
import { fetchComments, fetchNewComment } from '../../store/comments';

function PhotoById() {
    const { user_id, photo_id } = useParams();
    const [body, setBody] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const photo = useSelector((state) => state.photo.photo.Photo)
    const sessionUser = useSelector((state) => state.session.user);
    const comments = useSelector((state) => state.comments.comments)
    const likes = useSelector((state) => state.likes.likes)

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

    const onNewComment = async (e) => {
        const newComment = await dispatch(fetchNewComment(body, photo_id, sessionUser.id))
    }

    return photo && likes && comments ? (
        <>
        <div className='photo-by-id-container'>
        <div className='back-to-photos-div' onClick={() => history.push(`/${sessionUser.id}/photostreams`)}><i className="fa-solid fa-arrow-left"></i> Back to Photostream</div>
            <img
        alt="logo"
        className="logo-image"
        src="https://www.freeiconspng.com/thumbs/flickr-logo-png/flickr-logo-png-17.png"
      />
      <h1 className='photo-by-id-name'>Viewing {photo[0].title}</h1>
      <div className='photo-by-id-photo-container'>
        <img className='photo-by-id-photo' alt={photo[0].name} src={photo[0].photo_url}  />
      </div>
                <div className='photo-images-container'>
                    <div className='photo-edit-container'>
                        <i title="Edit Photo" className="fa-solid fa-pen-to-square fa-2xl" onClick={() => history.push(`/${sessionUser.id}/${photo[0].id}/update`)}></i>
                    </div>
                    <div className='photo-delete-container'>
                        <i title='Delete Photo' className="fa-solid fa-trash fa-2xl" onClick={() => history.push(`/${sessionUser.id}/${photo[0].id}/delete`)}></i>
                    </div>
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
        <div>{likes.length}</div>
        {comments.map((comment) => (
            comment.user_id == sessionUser.id ?
            <div key={comment.id}>
                <div className='comment-owner'>{comment.first_name} {comment.last_name}</div>
                <div>... upd/del l8tr</div>
                <div>{comment.body}</div>
            </div> : null
        ))}
        <div className='new-comment'>
            <textarea
            placeholder='Create a new comment here!'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            />
            <button  onClick={() => onNewComment()}disabled={body.length <= 0}>New Comment</button>
        </div>
        </>
    ) : null
}

export default PhotoById
