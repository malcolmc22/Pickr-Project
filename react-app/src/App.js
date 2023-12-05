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
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
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
          <Route exact path='/:user_id/new-photostream'>
              <CreatePhoto />
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
