import { useSelector } from "react-redux";
import "./home.css";
import { useHistory, useLocation } from "react-router-dom";

function Landing() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();

  return (
    <div>
      {sessionUser && location.pathname === `/${sessionUser.id}/prints` && (
        <div>
          <div className="left-container">
            <div className="activity-icon-container">
              {/* <div>All Activity</div> */}
            </div>
            <div className="activity-container">
              <h1> There is nothing to print right now.</h1>
              <div>Print will be implemented at a later date, head on over to the You page!</div>
            </div>
          </div>
          <div className="right-container"></div>
        </div>
      )}
      {sessionUser && location.pathname === `/${sessionUser.id}/explore` && (
        <div>
          <div className="left-container">
            <div className="activity-icon-container">
              {/* <div>All Activity</div> */}
            </div>
            <div className="activity-container">
              <h1> There is nothing to explore right now.</h1>
              <div>Explore will be implemented at a later date, head on over to the You page!</div>
            </div>
          </div>
          <div className="right-container"></div>
        </div>
      )}
      {sessionUser && location.pathname === `/` && (
        <div>
          <div className="left-container">
            <div className="activity-icon-container">
              {/* <div>All Activity</div> */}
            </div>
            <div className="activity-container">
              <h1> There is no activity right now.</h1>
              <div>Activity will be implemented at a later date, head on over to the You page!</div>
            </div>
          </div>
          <div className="right-container"></div>
        </div>
      )}

      {!sessionUser && location.pathname === '/' && (
        <div className="landing-intro">
          <h1>Find your inspiration.</h1>
          <div> Join the Pickr community, home to literally only me</div>
          <button className='start-for-free-button' onClick={()=> history.push('/signup')}>Start for free</button>
        </div>
      )}
        {!sessionUser && (<div className="landing-page-container"></div>)}
        <div >
          <footer className="footer">
            <h2>My socials:</h2>
               <div className="social-links">
              <a>Email: malcolmcaleb01@gmail.com</a>
              <a href="https://github.com/malcolmc22">
              Github: @malcolmc22
              {/* <img
              className="footer-github-logo"
              src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
              /> */}
              </a>
              </div>
          </footer>
        </div>

    </div>
  );
}

export default Landing;
