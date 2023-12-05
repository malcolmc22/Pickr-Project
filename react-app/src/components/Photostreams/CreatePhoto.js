import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchNewPhoto } from "../../store/photo";
function CreatePhoto() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo_url, setPhotoUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title)
    formData.append("description", description)
    formData.append("photo_url", photo_url);
    for (let key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    await dispatch(fetchNewPhoto(sessionUser.id, formData));
    history.push(`/${sessionUser.id}/photostreams`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
            Description
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            />
        </label>
        <label>
          Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoUrl(e.target.files[0])}
          />
        </label>
        <button type="submit">Submit</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </>
  );
}

export default CreatePhoto;
