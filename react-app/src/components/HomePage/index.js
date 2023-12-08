import { useSelector } from "react-redux";
import './home.css'
function Landing() {
  const sessionUser = useSelector((state) => state.session.user);

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
