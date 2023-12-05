import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { fetchPhotos } from '../../store/photo';
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAlbums } from '../../store/album';

function Albums() {
    const { user_id } = useParams();
    // console.log(user_id, 'userid')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPhotos(user_id))
        dispatch(fetchAlbums(user_id))
    }, [dispatch, user_id])

    return (
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
        </>
    )
}

export default Albums
