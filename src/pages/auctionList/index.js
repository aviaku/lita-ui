import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card6 from "../../components/card/Card6";
import Nav from "../../components/headerNoAuth/index";
import Header from "../../components/header";

const AuctionList = () => {
  const [isActive, setIsActive] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [filters, setFilters] = useState({});
  const [filertsApplied, setFiltersApplied] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;

  // handle filter change
  const handleFilterChange = async (e) => {
    const newFilters = { ...filters };
    newFilters[e.target.name] = e.target.value;
    setFilters(newFilters);
    setSelectedOption(e.target.value);

    // Call the api
    auctionList(newFilters);
  };

  // const handleFilterChange = (e) => {
  //   const newFilters = { ...filters };
  //   newFilters[e.target.name] = e.target.value;
  //   setFilters(newFilters);
  //   setSelectedOption(e.target.value);

  //   const objString = "?" + new URLSearchParams(newFilters).toString();
  //   console.log(objString);
  //   auctionList(objString);
  // };

  const handleReset = () => {
    setSelectedOption("");
    auctionList();
  };

  const auctionList = async (queryString = null) => {
    try {
      // if (queryString) {
      //   const res = await axios.get(
      //     `${apiEndpoint}/searchAuctions${queryString}`
      //   );
      //   console.log("🚀 ~ file: index.js:17 ~ auctions ~ res:", res);
      //   setAuctions(res.data.docs);
      // } else {
      const res = await axios.post(`${apiEndpoint}/getAllEvents`, queryString);
      console.log("🚀 ~ file: index.js:17 ~ auctions ~ res:", res);
      setAuctions(res.data.docs);
      // }
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  useEffect(() => {
    if (!auctions.length) auctionList();
  }, []);

  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <div className="mt-36 lg:flex lg:space-x-[30px]">
        <div className="lg:w-[270px]">
          <div
            className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] mb-[30px] lg:block ${
              isActive ? "block" : "hidden"
            } min-h-full`}
          >
            {/* <div className="filter-subject-item py-6 border-b border-qgray-border">
              <div className="subject-title mb-[20px]">
                <h1 className="text-black text-base font-500">
                  Product categories
                </h1>
              </div>
              <div className="filter-items">
                <ul>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input
                        type="radio"
                        name="category"
                        className="radio radio-xs"
                      />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Highest Rating
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input
                        type="radio"
                        name="category"
                        className="radio radio-xs"
                      />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Lowest Price
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input
                        type="radio"
                        name="category"
                        className="radio radio-xs"
                      />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Highest Price
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="filter-subject-item py-6 border-b border-qgray-border">
              <div className="subject-title mb-[20px]">
                <h1 className="text-black text-base font-500">Gender</h1>
              </div>
              <div className="filter-items">
                <ul>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input
                        type="radio"
                        value="ACTIVE"
                        checked={selectedOption === "ACTIVE"}
                        onChange={(e) => handleFilterChange(e)}
                        name="status"
                        className="radio radio-xs"
                      />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input
                        type="radio"
                        value="IN_PROGRESS"
                        checked={selectedOption === "IN_PROGRESS"}
                        onChange={(e) => handleFilterChange(e)}
                        name="status"
                        className="radio radio-xs"
                      />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          In Progress
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input
                        type="radio"
                        value="COMPLETED"
                        checked={selectedOption === "COMPLETED"}
                        onChange={(e) => handleFilterChange(e)}
                        name="status"
                        className="radio radio-xs"
                      />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Completed
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input
                        type="radio"
                        value="RESULT_VERIFICATION"
                        checked={selectedOption === "RESULT_VERIFICATION"}
                        onChange={(e) => handleFilterChange(e)}
                        name="status"
                        className="radio radio-xs"
                      />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Result Verification
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <br />
            <div className="w-full">
              <button
                className="btn btn-sm mx-auto w-full"
                onClick={() => handleReset()}
              >
                Clear
              </button>
            </div>
            <button
              onClick={() => setIsActive(false)}
              type="button"
              className={`w-10 h-10 fixed top-[6rem] right-5 z-50 rounded md:hidden justify-center items-center border border-qred text-qred ${
                !isActive ? "hidden" : "block"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="lg:!mr-8 flex-1">
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

export default AuctionList;
