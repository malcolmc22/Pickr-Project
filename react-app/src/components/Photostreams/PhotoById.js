import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { fetchPhotos } from '../../store/photo';
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function PhotoById() {
    const { user_id, photo_id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPhotos(user_id))
    }, [dispatch, user_id])
    return (
        <>
        <div>
            hi
        </div>
        </>
    )
}

export default PhotoById
