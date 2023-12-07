import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { fetchPhoto, fetchPhotos, fetchUpdatePhoto } from "../../store/photo";
import { fetchAlbum, fetchAlbums, fetchUpdateAlbum } from "../../store/album";

function UpdateAlbum() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user_id, album_id } = useParams();

    const [name, setName] = useState("");
    useEffect(() => {
      dispatch(fetchAlbums(user_id))
      dispatch(fetchAlbum(user_id,album_id))
    }, [dispatch, user_id, album_id]);

    let album = useSelector((state) => state.album.album?.Album);
    if (album) {
      album = album[0];
    }
  // console.log(photo, 'outside if')
  useEffect(() => {
    if (album) {
      setName(album.name);
    }
  }, [album]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name)
    const AlbumData = {
      name,
    };
    const updatedAlbum = await dispatch(fetchUpdateAlbum(user_id,album_id, AlbumData))

    history.push(`/${user_id}/albums`)
  };

  return (
    <div className="update-form-container">
      <form onSubmit={handleSubmit}>
        <div className="update-title-container">
          <label>
            Name
            <input
              className="update-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <button className="update-album-button" type="submit"> Update Album </button>
      </form>
    </div>
  );
}

export default UpdateAlbum;
