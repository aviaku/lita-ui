import { useState } from "react";
import Card4 from "../../components/card/Card4";
import Nav from "../../components/headerNoAuth/index";
import { gamers } from "../../data/gamers";
import Header from "../../components/header";

const Gamers = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <div className="mt-20 lg:flex lg:space-x-[30px]">
        <div className="lg:w-[270px]">
          <div
            className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] mb-[30px] lg:block ${
              isActive ? "block" : "hidden"
            } min-h-full`}
          >
            <div className="filter-subject-item py-6 border-b border-qgray-border">
              <div className="subject-title mb-[20px]">
                <h1 className="text-black text-base font-500">
                  Product categories
                </h1>
              </div>
              <div className="filter-items">
                <ul>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Recommended
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Newly Joined
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
            </div>
            <div className="filter-subject-item py-6 border-b border-qgray-border">
              <div className="subject-title mb-[20px]">
                <h1 className="text-black text-base font-500">
                  Product categories
                </h1>
              </div>
              <div className="filter-items">
                <ul>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Recommended
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Newly Joined
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
            </div>
            <div className="filter-subject-item py-6 border-b border-qgray-border">
              <div className="subject-title mb-[20px]">
                <h1 className="text-black text-base font-500">
                  Product categories
                </h1>
              </div>
              <div className="filter-items">
                <ul>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Recommended
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
                      <div>
                        <label
                          htmlFor="mobileLaptop"
                          className="text-sm font-400 capitalize"
                        >
                          Newly Joined
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="item flex justify-between items-center mb-2">
                    <div className="flex space-x-[14px] items-center">
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
                      <input type="checkbox" className="checkbox checkbox-xs" />
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
            </div>
            <button
              onClick={() => setIsActive(false)}
              type="button"
              className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
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
          <div className="products-sorting w-full rounded-lg bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[20px]">
            <div>
              <p className="font-400 text-[13px]">
                <span className="text-qgray"> Showing</span> 1–16 of 66 results
              </p>
            </div>
            <div className="flex space-x-3 items-center">
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
            </div>
            <button
              type="button"
              className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
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
          </div>
          <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
            {gamers.map((gamer) => (
              <Card4
                name={gamer.name}
                star={gamer.star}
                isLiked={gamer.isLiked}
                image={gamer.image}
                minBid={gamer.minBid}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamers;
