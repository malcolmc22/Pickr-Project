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
    const users = useSelector((state) => state.users.users.users);

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

    return photo && likes && comments && users ? (
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
                    {!likes.find((like) => like.user_id === sessionUser.id) ?
                        <div className='like-container'>
                            <i title='Like Photo' className='fa-regular fa-thumbs-up fa-2xl' onClick={() => onLike()}></i>
                        </div>
                    :
                        <div className='dislike-container'>
                            <i title='Dislike Photo' className='fa-regular fa-thumbs-down fa-2xl' onClick={() => onDislike()}></i>
                        </div>
                    }
                    <div className='photo-edit-container'>
                        <i title="Edit Photo" className="fa-solid fa-pen-to-square fa-2xl" onClick={() => history.push(`/${sessionUser.id}/${photo[0].id}/update`)}></i>
                    </div>
                    <div className='photo-delete-container'>
                        <i title='Delete Photo' className="fa-solid fa-trash fa-2xl" onClick={() => history.push(`/${sessionUser.id}/${photo[0].id}/delete`)}></i>
                    </div>
                </div>
        </div>
        <div className='bottom-section-container'>
            <div className='photo-info-container'>
                <div className='left-photo-info-container'>
                    <div className='photo-info'>
                        <div onClick={() => history.push(`/${photo[0].user_id}/photostreams`)} className='photo-owner-name'>
                            {users.find((user) => user.id == photo[0].user_id).first_name} {users.find((user) => user.id == photo[0].user_id).last_name}
                        </div>
                        <div className='photo-name'>
                            {photo[0].title}
                        </div>
                        <div className='photo-description'>
                            {photo[0].description}
                        </div>
                    </div>
                    <div className='comments-container'>
                        {comments.map((comment) => (
                            comment.user_id == sessionUser.id ?
                            <div className='comment' key={comment.id}>
                                <div className='comment-top-container'>
                                    <div onClick={() => history.push(`/${photo[0].user_id}/photostreams`)} className='comment-owner'>{comment.first_name} {comment.last_name}</div>
                                    <div className='comment-date'>{new Date(comment.created_at).toDateString()}</div>
                                    <div className='comment-update'>...</div>
                                </div>
                                <div className='comment-body'>{comment.body}</div>
                            </div> : null
                        ))}
                    </div>
                    <div className='new-comment'>
                        <textarea
                        className='new-comment-text'
                        placeholder='Create a new comment here!'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        />
                        <button className='new-comment-button' onClick={() => onNewComment()}disabled={body.length <= 0}>Add Comment</button>
                    </div>
                </div>
                <div className='right-photo-info-container'>
                    <div className='right-photo-info-top-container'>
                        <div className='likes-count-container'>
                            <div className='likes-amount'>{likes.length}</div>
                            {likes.length === 1 ?
                                <div className='likes-amount-title'>Like</div>
                            :
                                <div className='likes-amount-title'>Likes</div>
                            }
                        </div>
                        <div className='comments-count-container'>
                            <div className='comments-amount'>{comments.length}</div>
                            {comments.length === 1 ?
                                <div className='comments-amount-title'>Comment</div>
                            :
                                <div className='comments-amount-title'>Comments</div>
                            }
                        </div>
                        <div className='photo-created-container'>
                            <div className='photo-created-info'> Uploaded on {new Date(photo[0].created_at).toDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    ) : null
}

export default PhotoById
