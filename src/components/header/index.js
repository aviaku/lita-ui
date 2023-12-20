import "./style.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useReducer, useEffect } from "react";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
import { friendspage } from "../../functions/reducers";
import { getFriendsPageInfos } from "../../functions/user";
export default function Header({ page, getAllPosts }) {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const allmenu = useRef(null);
  const usermenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: "",
  });

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsPageInfos(user?.token);
    if (data.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "FRIENDS_ERROR", payload: data.data });
    }
  };

  // fetch notifications from API
  const getNotifications = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getNotificationByUserId/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (res.status === 200) {
        setNotifications(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useState(() => {
    getNotifications();
  }, []);

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Game/Gamer"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          token={user?.token}
        />
      )}
      {/* <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          onClick={() => getAllPosts()}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1 ">
          <Gaming color={color} />
        </Link>
      </div> */}
      {Cookies.get("user") ? (
        <div className="header_right">
          <div
            className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
            ref={allmenu}
          >
            <div
              onClick={() => {
                setShowAllMenu((prev) => !prev);
              }}
            >
              <div className="circle_icon hover1">
                <Notifications />
                {notifications.length > 0 && (
                  <div className="right_notification">
                    {notifications.length}
                  </div>
                )}
              </div>
            </div>

            {showAllMenu && <AllMenu notifications={notifications} />}
          </div>
          <Link
            to="/profile"
            className={`profile_link hover1 ${
              page === "profile" ? "active_link" : ""
            }`}
          >
            <img src={user?.picture} alt="" />
            <span>{user?.first_name}</span>
          </Link>
          {/* <div
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          ref={allmenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>

          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div> */}
          <div
            className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
            ref={usermenu}
          >
            <div
              onClick={() => {
                setShowUserMenu((prev) => !prev);
              }}
            >
              <div style={{ transform: "translateY(2px)" }}>
                <ArrowDown />
              </div>
            </div>
            {showUserMenu && (
              <UserMenu friendRequests={data?.requests?.length} user={user} />
            )}
            {data?.requests?.length > 0 && (
              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                {data?.requests?.length}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="header_right">
          <Link
            to={`/login`}
            className={`relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max`}
          >
            <span className="relative text-sm font-semibold text-white">
              Login
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
