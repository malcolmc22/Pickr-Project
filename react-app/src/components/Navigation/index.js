import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <nav className="header-nav">
      {/* <div>
        <NavLink exact to="/">
          <img src="https://www.freeiconspng.com/thumbs/flickr-logo-png/flickr-logo-png-17.png" />
          Pickr
        </NavLink>
      </div> */}
      {isLoaded && !sessionUser && (
        <div className="auth-container">
          <div className="logo-container">
            <NavLink exact to="/">
              <img
                alt="logo"
                className="logo-image"
                src="https://www.freeiconspng.com/thumbs/flickr-logo-png/flickr-logo-png-17.png"
              />
              Pickr
            </NavLink>
          </div>
          <div className="nav-buttons-container">
            <div>
              <NavLink exact to="/login">
                <button className="nav-login-button">Log In</button>
              </NavLink>
            </div>
            <div>
              <NavLink exact to="/signup">
                <button className="nav-signup-button">Sign Up</button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
      {isLoaded && sessionUser && (
        <>
          <div>
            <div>
              <NavLink exact to="/">
                <img
                  alt="logo"
                  className="logo-image"
                  src="https://www.freeiconspng.com/thumbs/flickr-logo-png/flickr-logo-png-17.png"
                />
                Pickr
              </NavLink>
            </div>
            <div>
              <NavLink exact to={`/${sessionUser.id}/photostreams`}>
                You
              </NavLink>
            </div>
            <div>
              <NavLink exact to={`/${sessionUser.id}/explore`}>
                Explore
              </NavLink>
            </div>
            <div>
              <NavLink exact to={`/${sessionUser.id}/prints`}>
                Prints
              </NavLink>
            </div>
          </div>

          <div>
            <button onClick={handleLogout}> Log Out </button>
            {/* <ProfileButton user={sessionUser} isLoaded={isLoaded} /> */}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navigation;
