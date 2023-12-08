import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchPhotos } from '../../store/photo';
import { fetchAddPhotoToAlbum, fetchAlbum, fetchAlbums, fetchUpdateAlbum } from "../../store/album";

function UpdateAlbum() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user_id, album_id } = useParams();
    const photos = useSelector((state) => Object.values(state.photo.allPhotos)[0]);
    const [name, setName] = useState("");
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
      dispatch(fetchPhotos(user_id))
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

  const AddPhoto = async (photo_id) => {
    const addPhoto = await dispatch(fetchAddPhotoToAlbum(user_id, album_id, photo_id))
    history.push(`/${sessionUser.id}/albums/${album_id}`)
  }

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
        <button className="update-album-button" type="submit"> Update Album Name </button>
      </form>
      <div className='all-photos-container'>
            {photos?.map((photo) => (
                photo.album_id != album_id ? (
                <div key={photo.id}>
                <div>{photo.id}</div>
                <img  alt={photo.name} src={photo.photo_url} onClick={() => history.push(`/${sessionUser.id}/${photo.id}`)}/>
                <div><button  type="button" onClick={() => AddPhoto(photo.id)}>Add Photo</button></div>
                </div>) : null
            ))}
        </div>
    </div>
  );
}

export default UpdateAlbum;
