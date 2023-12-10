import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCreateAlbum } from "../../store/album";

function CreateAlbum() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    const newAlbumData = {
        name,
    }
    await dispatch(fetchCreateAlbum(sessionUser.id, newAlbumData))
    history.push(`/${sessionUser.id}/albums`)
  }
  return (
    <>
      <form className='new-album-form' onSubmit={handleSubmit}>
      <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Album</button>
      </form>
    </>
  );
}

export default CreateAlbum;
