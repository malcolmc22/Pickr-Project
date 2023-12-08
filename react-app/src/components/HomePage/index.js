import { useSelector } from "react-redux";
import "./home.css";
import { useHistory, useLocation } from "react-router-dom";

function Landing() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();

  return (
    <div>
      {sessionUser && (
        <div>
          <div className="left-container">
            <div className="activity-icon-container">
              <div>All Activity</div>
            </div>
            <div className="activity-container">
              <div> There is no activity to show right now.</div>
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
      {!sessionUser && (
        <div className="landing-page-container">
          <footer className="footer">
            <div className="malcolm-about">
              My socials:
              <a>email: malcolmcaleb01@gmail.com</a>
              <a href="https://github.com/malcolmc22">github: @malcolmc22</a>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Landing;
