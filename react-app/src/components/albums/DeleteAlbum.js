import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { fetchDeletePhoto, fetchPhoto, fetchPhotos, fetchUpdatePhoto } from "../../store/photo";
import { fetchAlbum, fetchAlbums, fetchDeleteAlbum } from "../../store/album";

function DeleteAlbum() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user_id, album_id } = useParams();

  useEffect(() => {
    dispatch(fetchAlbums(user_id))
    dispatch(fetchAlbum(user_id,album_id))
  }, [dispatch, user_id, album_id]);

  let album = useSelector((state) => state.album.album?.Album);
  if (album) {
    album = album[0];
  }

  const onDelete = async (e) => {
    const deleteAlbum = await dispatch(fetchDeleteAlbum(user_id,album_id));
    history.push(`/${user_id}/albums`);
  };

  return (
    <>
      {album && (
        <div>
          <h1>Are you sure you want to delete {album.name}?</h1>
          <button className="yes-button" onClick={() => onDelete()}>
            Yes (Delete Album)
          </button>
          <button
            className="no-button"
            onClick={() => history.push(`/${user_id}/albums`)}>
            No (Keep Album)
          </button>
        </div>
      )}
    </>
  );
}

export default DeleteAlbum;
