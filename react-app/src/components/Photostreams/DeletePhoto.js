import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchDeletePhoto, fetchPhoto, fetchPhotos, fetchUpdatePhoto } from "../../store/photo";

function DeletePhoto() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user_id, photo_id } = useParams();

  useEffect(() => {
    dispatch(fetchPhotos(user_id));
    dispatch(fetchPhoto(user_id, photo_id));
  }, [dispatch, user_id, photo_id]);

  let photo = useSelector((state) => state.photo?.photo?.Photo);
  if (photo) {
    photo = photo[0];
  }

  const onDelete = async (e) => {
    const deletePhoto = await dispatch(fetchDeletePhoto(user_id,photo_id));
    history.push(`/${user_id}/photostreams`);
  };

  return (
    <>
      {photo && (
        <div>
          <h1>Are you sure you want to delete {photo.title}?</h1>
          <button className="yes-button" onClick={() => onDelete()}>
            Yes (Delete Photo)
          </button>
          <button
            className="no-button"
            onClick={() => history.push(`/${user_id}/photostreams`)}>
            No (Keep Photo)
          </button>
        </div>
      )}
    </>
  );
}

export default DeletePhoto;
