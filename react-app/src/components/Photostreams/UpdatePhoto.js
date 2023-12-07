import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchPhoto, fetchPhotos, fetchUpdatePhoto } from "../../store/photo";

function UpdatePhoto() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user_id, photo_id } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchPhotos(user_id));
    dispatch(fetchPhoto(user_id, photo_id)).then(() => setIsLoaded(true));
  }, [dispatch, user_id, photo_id]);

  let photo = useSelector((state) => state.photo?.photo?.Photo);
  if (photo) {
    photo = photo[0];
  }
  // console.log(photo, 'outside if')
  useEffect(() => {
    if (photo) {
      setTitle(photo.title);
      setDescription(photo.description);
    }
  }, [photo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title)
    formData.append("description", description)
    const PicData = {
      title,
      description,
    };
    const updatedPic = await dispatch(fetchUpdatePhoto(user_id,photo_id, PicData))

    history.push(`/${user_id}/photostreams`)
  };

  return (
    <div className="update-form-container">
      <form onSubmit={handleSubmit}>
        <div className="update-title-container">
          <label>
            Title
            <input
              className="update-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="update-description-container">
          <label>
            description
            <input
              className="update-description-input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button className="update-pic-button" type="submit"> Update Photo </button>
      </form>
    </div>
  );
}

export default UpdatePhoto;
