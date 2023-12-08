import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./components/HomePage";
import PhotoStream from "./components/Photostreams";
import Albums from "./components/albums";
import CreatePhoto from "./components/Photostreams/CreatePhoto";
import PhotoById from "./components/Photostreams/PhotoById";
import UpdatePhoto from "./components/Photostreams/UpdatePhoto";
import DeletePhoto from "./components/Photostreams/DeletePhoto";
import CreateAlbum from "./components/albums/CreateAlbum";
import DeleteAlbum from "./components/albums/DeleteAlbum";
import UpdateAlbum from "./components/albums/UpdateAlbum";
import AlbumById from "./components/albums/GetAlbumById";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
            <Landing />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
            <Landing />
          </Route>
          <Route exact path='/' >
            <Landing />
          </Route>
          <Route exact path='/:user_id/photostreams'>
              <PhotoStream />
          </Route>
          <Route exact path='/:user_id/albums'>
              <Albums />
          </Route>
          <Route exact path='/:user_id/albums/:album_id/update'>
              <UpdateAlbum />
          </Route>
          <Route exact path='/:user_id/albums/:album_id/delete'>
              <DeleteAlbum />
          </Route>
          <Route exact path='/:user_id/albums/new-album'>
              <CreateAlbum />
          </Route>
          <Route exact path='/:user_id/albums/:album_id'>
              <AlbumById />
          </Route>
          <Route exact path='/:user_id/new-photostream'>
              <CreatePhoto />
          </Route>
          <Route exact path='/:user_id/:photo_id/update'>
              <UpdatePhoto />
          </Route>
          <Route exact path='/:user_id/:photo_id/delete'>
              <DeletePhoto />
          </Route>
          <Route exact path='/:user_id/:photo_id'>
              <PhotoById />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
