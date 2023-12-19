import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import Landing from "./pages/landing";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postsReducer } from "./functions/reducers";
import Friends from "./pages/friends";
import Gamers from "./pages/gamers";
import AuctionList from "./pages/auctionList";
import Auction from "./pages/auction";
import CreateAuction from "./pages/createAuction";
import CreateGame from "./pages/admin/game/createGame";
import Games from "./pages/admin/game/games";
import CreateBanner from "./pages/admin/banner/createBanner";
import Banners from "./pages/admin/banner/banners";
import Wallet from "./pages/wallet";
import MyAuctions from "./pages/myAuctions";
import MyBids from "./pages/myBids";
import AboutPage from "./pages/about";
import FAQPage from "./pages/faq";
import PrivacyPolicyPage from "./pages/privacyPolicy";
import Payment from "./pages/payment/Payment";
import Completion from "./pages/payment/Completion";
import Success from "./pages/payment/Success";
import MoneyWithdrawal from "./pages/withdrawal";
import Kyc from "./pages/kyc";
import WithdrawalHistory from "./pages/withdrawal/WithdrawalHistory";
import TransactionHistory from "./pages/wallet/TransactionHistory";
function App() {
  const [visible, setVisible] = useState(false);
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response?.data.message,
      });
    }
  };
  return (
    <div className={darkTheme && "dark"}>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts}
          dispatch={dispatch}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends/:type"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/home"
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
          <Route path="/createAuction" element={<CreateAuction />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>

        <Route path="/wallet" element={<Wallet />} exact />
        <Route path="/withdrawal" element={<MoneyWithdrawal />} exact />
        <Route path="/transactions" element={<TransactionHistory />} exact />
        <Route
          path="/withdrawalHistory/"
          element={<WithdrawalHistory />}
          exact
        />
        <Route path="/kyc" element={<Kyc />} exact />
        <Route path="/gamers" element={<Gamers />} exact />
        <Route path="/auctions" element={<AuctionList />} exact />
        <Route path="/auction/:id" element={<Auction />} exact />
        <Route path="/myAuctions" element={<MyAuctions />} exact />
        <Route path="/myBids" element={<MyBids />} exact />
        <Route path="/admin/createGame" element={<CreateGame />} exact />
        <Route path="/admin/games" element={<Games />} exact />
        <Route path="/admin/banners" element={<Banners />} exact />
        <Route path="/admin/createBanner" element={<CreateBanner />} exact />
        <Route path="/about" element={<AboutPage />} exact />
        <Route path="/faq" element={<FAQPage />} exact />
        <Route path="/payment" element={<Payment />} exact />
        <Route path="/completion" element={<Completion />} exact />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} exact />
        <Route path="/reset" element={<Reset />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/"
          element={
            <Landing
              setVisible={setVisible}
              posts={posts}
              loading={loading}
              getAllPosts={getAllPosts}
            />
          }
          exact
        />
      </Routes>
    </div>
  );
}

export default App;
