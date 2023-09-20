import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card6 from "../../components/card/Card6";
import Nav from "../../components/headerNoAuth/index";
import Header from "../../components/header";

const MyBids = () => {
  const [isActive, setIsActive] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;

  const auctionList = async (queryString = null) => {
    try {
        const res = await axios.get(
          `${apiEndpoint}/auctions/my-bids/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("🚀 ~ file: index.js:17 ~ auctions ~ res:", res);
        setAuctions(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  useEffect(() => {
    if (!auctions.length) auctionList();
  });

  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <div className="mt-36 lg:flex lg:space-x-[30px] flex items-center">
        <div className="container ml-auto mr-auto flex flex-wrap items-start">
          {/* <div className="products-sorting w-full rounded-lg md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[20px]"> */}
          {/* <div>
              <p className="font-400 text-[13px]">
                <span className="text-qgray"> Showing</span> 1–16 of 66 results
              </p>
            </div> */}
          {/* <div className="flex space-x-3 items-center">
              <span className="font-400 text-[13px]">Sort by:</span>
              <div className="flex space-x-3 items-center border-b border-b-qgray">
                <span className="font-400 text-[13px] text-qgray">Default</span>
                <span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 1L5 5L9 1" stroke="#9A9A9A"></path>
                  </svg>
                </span>
              </div>
            </div> */}
          <button
            type="button"
            className={`w-10 h-10 fixed top-[6rem] right-5 z-50 rounded md:hidden justify-center items-center border border-qred text-qred ${
              isActive ? "hidden" : "block"
            }`}
            onClick={() => setIsActive(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
          </button>
          {/* </div> */}
          <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
            {auctions &&
              auctions.map((auction) => (
                <Card6
                  _id={auction._id}
                  basePrice={auction.basePrice}
                  dateTime={auction.dateTime}
                  game={auction.game}
                  user={auction.user}
                  bids={auction.bid}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBids;
