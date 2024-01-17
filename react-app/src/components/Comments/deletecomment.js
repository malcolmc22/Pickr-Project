import './commentmodal.css'
import { useModal } from '../../context/Modal'
import { fetchDeleteComment } from '../../store/comments';
import { useDispatch } from 'react-redux';
function DeleteComment({comment}) {

    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const onDelete = async () =>{
        const deleteComment = await dispatch(fetchDeleteComment(comment.photo_id, comment.user_id, comment.id))
        closeModal();
    }

    return(
        <div className="comment-delete-modal-container">
            <div className="comment-delete-upper-container">
                <i onClick={() => {closeModal()}}className="fa-solid fa-xmark fa-2xl"></i>
                <h1 className="comment-delete-title">Delete Comment</h1>
            </div>
            <div className="comment-confirmation">Are you sure you want to delete this comment?</div>
            <div className="comment-cancel-ok-container">
                <button className="comment-cancel-delete-button" onClick={() => closeModal()}>Cancel</button>
                <button className="comment-confirm-delete-button" onClick={() => onDelete()}>OK</button>
            </div>
        </div>
    )
}

export default DeleteComment
