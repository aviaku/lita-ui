import { Link } from "react-router-dom";

export default function SettingsPrivacy({ setVisible }) {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Event & Donation
      </div>
      <Link to="/createAuction">
        <div className="mmenu_item hover3">
          <div className="small_circle">
            <i className="settings_filled_icon"></i>
          </div>
          <span>Create Event</span>
        </div>
      </Link>
      <Link to="/myAuctions">
        <div className="mmenu_item hover3">
          <div className="small_circle">
            <i className="privacy_checkup_icon"></i>
          </div>
          <span>My Events</span>
        </div>
      </Link>
      {/* <Link to="/myBids">
        <div className="mmenu_item hover3">
          <div className="small_circle">
            <i className="privacy_shortcuts_icon"></i>
          </div>
          <span>My Bids</span>
        </div>
      </Link> */}
      {/* <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="activity_log_icon"></i>
        </div>
        <span>Activity log</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="news_icon"></i>
        </div>
        <span>News Feed Prefrences</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="language_icon"></i>
        </div>
        <span>Language</span>
      </div> */}
    </div>
  );
}
