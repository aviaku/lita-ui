import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DisplayAccessibility from "./DisplayAccessibility";
import HelpSupport from "./HelpSupport";
import SettingsPrivacy from "./SettingsPrivacy";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
export default function UserMenu({ user, friendRequests }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.picture} alt="" />
            <div className="mmenu_col">
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <Link to="/friends">
            <div className="mmenu_main hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
                {friendRequests > 0 && (
                  <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {friendRequests}
                  </div>
                )}
              </div>
              <div className="mmenu_col">
                <div className="mmenu_span1">Friends</div>
                <div className="mmenu_span2"> See your friends</div>
              </div>
            </div>
          </Link>
          <Link to="/auctions">
            <div className="mmenu_main hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <div className="mmenu_col">
                <div className="mmenu_span1">Ongoing Events</div>
              </div>
            </div>
          </Link>
          <Link to="/wallet">
            <div className="mmenu_main hover3">
              <div className="small_circle">
                <img src="../../../icons/wallet1.png" alt="" />
              </div>
              <div className="mmenu_col">
                <div className="mmenu_span1">Wallet</div>
              </div>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(1);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Event & Donation</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          {/* <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(2);
            }}
          >
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(3);
            }}
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div> */}
          <div
            className="mmenu_item hover3"
            onClick={() => {
              logout();
            }}
          >
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}
