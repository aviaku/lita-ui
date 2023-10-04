import { useEffect, useState } from "react";
import Nav from "../../components/headerNoAuth/index";
import Footer from "../../components/footer/Index";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toastify } from "../../helpers/toastify";
import Header from "../../components/header";
import Card7 from "../../components/card/Card7";

const MyAuctions = () => {
  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;
  const { user } = useSelector((state) => ({ ...state }));
  const [auctions, setAuctions] = useState([]);

  const handleDelete = async (_id) => {
    try {
      const res = await axios.put(
        `${apiEndpoint}/auctions/cancel/${_id}`,
        {user: {userId: _id}},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toastify("Auction Canceled!");
      gameList();
    } catch (error) {
      toastify("Something went wrong!");
    }
  };

  const gameList = async () => {
    try {
      const res = await axios.get(
        `${apiEndpoint}/events/my-events/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("🚀 ~ file: index.js:17 ~ games ~ res:", res);
      setAuctions(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  useEffect(() => {
    gameList();
  }, []);

  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <div className="mt-36 lg:flex lg:space-x-[30px]">
        <div className="lg:!mr-8 flex-1">
          <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
            {auctions &&
              auctions.map((auction) => (
                <Card7
                  _id={auction._id}
                  basePrice={auction.basePrice}
                  dateTime={auction.dateTime}
                  game={auction.game}
                  user={auction.user}
                  bids={auction.bid}
                  status={auction.status}
                  handleDelete={() => handleDelete(auction._id)}
                />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default MyAuctions;
