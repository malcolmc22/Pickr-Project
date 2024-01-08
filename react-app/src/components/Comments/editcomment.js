import './commentmodal.css'
import {useState} from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { fetchUpdateComment } from '../../store/comments';
function EditComment({comment}) {
    const [body, setBody] = useState(comment.body)
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const onEdit = async (editedBody) => {
        const updatedComment = await dispatch(fetchUpdateComment(comment.photo_id, comment.user_id, comment.id, editedBody))
        closeModal();
    }

    return(
        <div className="comment-edit-modal-container">
            <div className="comment-edit-upper-container">
                <i className="fa-solid fa-xmark fa-2xl"></i>
                <h1 className="comment-edit-title">Edit Comment</h1>
            </div>
            <div className="comment-edit-confirmation">
                <textarea
                className='edit-comment-text'
                placeholder='Edit your comment here!'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                />
            </div>
            <div className="comment-cancel-ok-container">
                <button className="comment-cancel-delete-button" onClick={() => closeModal()}>Cancel</button>
                <button className="comment-confirm-edit-button" disabled={body.length <=0} onClick={() => onEdit(body) }>Done</button>
            </div>
        </div>
    )
}

export default EditComment
