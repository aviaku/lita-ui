import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { DateTime } from "luxon";
import Card4 from "../../components/card/Card4";
import Nav from "../../components/headerNoAuth/index";
import { gamers } from "../../data/gamers";
import Footer from "../../components/footer/Index";
import { auth, firestore } from "../../config/firebase";
import CountdownTimer from "./CountdownTimer";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GoogleSignIn from "../login/googleSignIn";
import { useEffect } from "react";
import Header from "../header";

// function Auction() {
//   const [user] = useAuthState(auth);

//   return (
//     <div className="App">
//       <section>{user ? <Abc /> : <GoogleSignIn />}</section>
//     </div>
//   );
// }

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className="sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }

const Auction = () => {
  const { id } = useParams();

  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;

  const { user } = useSelector((state) => ({ ...state }));
  const [bidAmount, setBidAmount] = useState("");
  const [auction, setAuction] = useState(null);
  const [highestBid, setHighestBid] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [auctionDateTime, setAuctionDateTime] = useState(null);
  const messagesRef = firestore.collection(id);
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const lastFiveBids = messages && messages.slice(-5);

  const bid = async (e) => {
    e.preventDefault();

    // const { uid, photoURL, displayName } = auth.currentUser;

    if (bidAmount.trim() === "") {
      return; // Skip if the formValue is empty or contains only whitespace
    }

    const lastMessage = messages && messages[messages.length - 1];
    if (messages.length) {
      await messagesRef.doc(lastMessage.id).update({
        text: bidAmount,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      await messagesRef.add({
        text: bidAmount,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user?.id,
        photoURL:
          auction?.user?.picture &&
          "https://cdn-icons-png.flaticon.com/512/666/666201.png",
        displayName: user?.first_name,
      });
    }

    setBidAmount("");
  };

  const handleAmountChange = (e) => {
    const re = /^[0-9₹\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setBidAmount(e.target.value.replace("₹", ""));
    }
    if (
      parseInt(e.target.value.replace("₹", "")) >
      parseInt(messages[messages.length - 1]?.text || auction.basePrice)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  const auctionList = async () => {
    try {
      const res = await axios.post(
        `${apiEndpoint}/getAllAuctions`,
        { status: "ACTIVE" },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const auc = res.data.filter((d) => d._id === id)[0];
      const bidDateTime = new Date(auc.dateTime).getTime();
      setAuctionDateTime(bidDateTime);
      setAuction(auc);
      const topBid = Math.max(...auc.bids.map((o) => o.x));
      setHighestBid(topBid);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  useEffect(() => {
    auctionList();
  }, []);

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  // return "Hi"
  return (
    <div>
      {/* <Nav /> */}
      <Header />
      <div className=" relative">
        <div className="container mx-auto pt-[106px]">
          {/* Product details section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start mx-6">
            <div className="p-4 col-span-2 md:col-span-1 bg-white dark:bg-dark rounded-lg outline outline-1 hover:outline-2 outline-gray-300 hover:outline-primary-500 dark:hover:outline-primary-500 dark:outline-gray-800 shadow-outline hover:shadow-hover">
              <img
                className="w-full rounded-lg"
                src={auction?.user?.picture && auction?.game?.picture}
                alt="craft-image"
              />
            </div>
            {/* <SignOut /> */}
            <div className="col-span-2 md:col-span-1 mx-2">
              <p className="text-gray-900 dark:text-white mb-1">
                Tournament ends in:
              </p>
              <div className="mx-auto md:!ml-0 max-w-[284px] w-full h-14 px-4 py-2 flex items-center justify-between bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 rounded-xl">
                {auctionDateTime && (
                  <CountdownTimer targetDate={auctionDateTime} />
                )}
              </div>
              <div className="max-w-[484px] w-full">
                <h4 className="mt-4 mb-0 text-4xl font-semibold leading-loose text-gray-900 dark:text-white">
                  {" "}
                  {auction?.user?.first_name} {auction?.user?.last_name}
                </h4>
                {/* <div className="mb-4 flex items-center">
                  <div className="flex items-center">
                    <button className="w-8 h-8 p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full">
                      <svg
                        className="w-4 h-4 fill-gray-700 dark:fill-white"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.76667 5.32817C7.84445 5.32014 7.92223 5.31746 8 5.31746C9.47223 5.31746 10.6667 6.44514 10.6667 7.88889C10.6667 9.30853 9.47223 10.4603 8 10.4603C6.50278 10.4603 5.33334 9.30853 5.33334 7.88889C5.33334 7.81389 5.33611 7.73889 5.34445 7.66389C5.60278 7.78443 5.90278 7.88889 6.22223 7.88889C7.20278 7.88889 8 7.12014 8 6.1746C8 5.86657 7.89167 5.57728 7.76667 5.32817ZM13.35 4.04782C14.65 5.21032 15.5194 6.57907 15.9306 7.55943C16.0222 7.77103 16.0222 8.00675 15.9306 8.21835C15.5194 9.1746 14.65 10.5434 13.35 11.73C12.0417 12.9032 10.2444 13.8889 8 13.8889C5.75556 13.8889 3.95834 12.9032 2.65056 11.73C1.35056 10.5434 0.48167 9.1746 0.0683646 8.21835C-0.0227882 8.00675 -0.0227882 7.77103 0.0683646 7.55943C0.48167 6.57907 1.35056 5.21032 2.65056 4.04782C3.95834 2.87568 5.75556 1.88889 8 1.88889C10.2444 1.88889 12.0417 2.87568 13.35 4.04782ZM8 4.03175C5.79167 4.03175 4 5.75943 4 7.88889C4 10.0184 5.79167 11.746 8 11.746C10.2083 11.746 12 10.0184 12 7.88889C12 5.75943 10.2083 4.03175 8 4.03175Z" />
                      </svg>
                    </button>
                    <small className="ml-2 font-medium text-gray-900 dark:text-white">
                      {" "}
                      2536{" "}
                    </small>
                  </div>
                  <div className="mx-4 flex items-center">
                    <button className="w-8 h-8 p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full">
                      <svg
                        className="w-4 h-4 fill-gray-700 dark:fill-white"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.97539 3.4724L8.30352 3.14482C9.21953 2.25205 10.4883 1.84572 11.7352 2.05326C13.6191 2.36716 15 3.9974 15 5.90873V6.06732C15 7.20208 14.5297 8.28763 13.6984 9.06146L8.75742 13.6744C8.55234 13.8658 8.28164 13.9724 8 13.9724C7.71836 13.9724 7.44766 13.8658 7.24258 13.6744L2.30129 9.06146C1.47113 8.28763 1 7.20208 1 6.06732V5.90873C1 3.9974 2.38141 2.36716 4.26484 2.05326C5.48711 1.84572 6.78047 2.25205 7.67188 3.14482L7.97539 3.4724ZM7.97539 4.71107L7.05391 3.76224C6.36211 3.07072 5.375 2.75517 4.40977 2.91623C2.94715 3.16013 1.85039 4.42669 1.85039 5.90873V6.06732C1.85039 6.96146 2.24551 7.81185 2.8982 8.42162L7.83867 13.0345C7.88242 13.0755 7.93984 13.0974 7.97539 13.0974C8.06016 13.0974 8.11758 13.0755 8.16133 13.0345L13.1023 8.42162C13.7531 7.81185 14.125 6.96146 14.125 6.06732V5.90873C14.125 4.42669 13.0531 3.16013 11.5902 2.91623C10.6004 2.75517 9.63789 3.07072 8.94609 3.76224L7.97539 4.71107Z" />
                      </svg>
                    </button>
                    <small className="ml-2 font-medium text-gray-900 dark:text-white">
                      {" "}
                      368{" "}
                    </small>
                  </div>
                  <div className="flex items-center">
                    <button className="w-8 h-8 p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full">
                      <svg
                        className="w-4 h-4 fill-gray-700 dark:fill-white"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15 4C15 5.65625 13.6562 7 12 7C11.0969 7 10.2875 6.6 9.7375 5.96875L6.93437 7.37187C6.97812 7.575 6.97188 7.78438 6.97188 7.97188C6.97188 8.21563 6.97812 8.425 6.93437 8.62813L9.7375 10.0031C10.2875 9.4 11.0969 8.97188 12 8.97188C13.6562 8.97188 15 10.3156 15 12C15 13.6562 13.6562 15 12 15C10.3156 15 9 13.6562 9 12C9 11.7844 9.02188 11.575 9.06563 11.3719L6.2625 9.96875C5.7125 10.6 4.90312 11 4 11C2.34312 11 1 9.65625 1 7.97188C1 6.31563 2.34312 4.97188 4 4.97188C4.90312 4.97188 5.7125 5.4 6.2625 6.00313L9.06563 4.62813C9.02188 4.425 9 4.21563 9 4C9 2.34312 10.3156 1 12 1C13.6562 1 15 2.34312 15 4ZM3.97187 9.5C4.82812 9.5 5.47188 8.82812 5.47188 8C5.47188 7.17188 4.82812 6.5 3.97187 6.5C3.17156 6.5 2.47187 7.17188 2.47187 8C2.47187 8.82812 3.17156 9.5 3.97187 9.5ZM12 2.5C11.1719 2.5 10.5 3.17188 10.5 4C10.5 4.82812 11.1719 5.5 12 5.5C12.8281 5.5 13.5 4.82812 13.5 4C13.5 3.17188 12.8281 2.5 12 2.5ZM12 13.5C12.8281 13.5 13.5 12.8281 13.5 12C13.5 11.1719 12.8281 10.5 12 10.5C11.1719 10.5 10.5 11.1719 10.5 12C10.5 12.8281 11.1719 13.5 12 13.5Z" />
                      </svg>
                    </button>
                    <small className="ml-2 font-medium text-gray-900 dark:text-white">
                      {" "}
                      52{" "}
                    </small>
                  </div>
                </div> */}
                <p className="font-normal text-sm text-justify text-gray-700 dark:text-gray-400">
                  {" "}
                  {auction?.description}{" "}
                </p>
              </div>
              <div>
                <div className="mt-4 mb-6 max-w-[364px] w-full flex items-center justify-between">
                  <div>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-1">
                      {" "}
                      Game:{" "}
                    </p>
                    <div className="flex items-center">
                      <img
                        alt=""
                        src={auction?.game?.picture}
                        className="w-10 h-10 mr-3 rounded-full outline outline-1 outline-white"
                      />
                      <p className="flex items-center font-medium text-gray-900 dark:text-white">
                        {" "}
                        {auction?.game?.name}{" "}
                        <svg
                          className="ml-2 w-3 h-3 fill-primary-500"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 0C9.15 0 10.15 0.646875 10.6531 1.59687C11.6812 1.25312 12.8156 1.53 13.6562 2.34313C14.4688 3.15625 14.6906 4.31875 14.4031 5.34688C15.3531 5.85 16 6.85 16 8C16 9.15 15.3531 10.15 14.4031 10.6531C14.7187 11.6812 14.4688 12.8156 13.6562 13.6562C12.8156 14.4688 11.6812 14.6906 10.6531 14.4031C10.15 15.3531 9.15 16 8 16C6.85 16 5.85 15.3531 5.34688 14.4031C4.31875 14.7187 3.15625 14.4688 2.34313 13.6562C1.53 12.8156 1.28125 11.6812 1.59687 10.6531C0.646875 10.15 0 9.15 0 8C0 6.85 0.646875 5.85 1.59687 5.34688C1.25312 4.31875 1.53 3.15625 2.34313 2.34313C3.15625 1.53 4.31875 1.28125 5.34688 1.59687C5.85 0.646875 6.85 0 8 0ZM11.0031 7.00313C11.3219 6.7375 11.3219 6.2625 11.0031 5.96875C10.7375 5.67812 10.2625 5.67812 9.96875 5.96875L7 8.94063L5.75313 7.71875C5.4875 7.42812 5.0125 7.42812 4.71875 7.71875C4.42812 8.0125 4.42812 8.4875 4.71875 8.75313L6.46875 10.5031C6.7625 10.8219 7.2375 10.8219 7.50313 10.5031L11.0031 7.00313Z" />
                        </svg>
                      </p>
                    </div>
                  </div>
                  {/* <div>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-1">
                      {" "}
                      Base Price:{" "}
                    </p>
                    <div className="flex items-center">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {" "}
                        ₹{auction && auction?.basePrice}{" "}
                      </p>
                    </div>
                  </div> */}
                </div>

                <div className="mt-7">
                  {parseInt(highestBid) ? (
                    <div className="flex items-center mt-2">
                      <p className="font-normal text-gray-900 dark:text-white mr-3">
                        {" "}
                        Highest Bid:{" "}
                      </p>
                      <h6 className="font-semibold text-2xl text-gray-900 dark:text-white">
                        {" "}
                        ₹{messages && messages[messages.length - 1]?.text}{" "}
                      </h6>
                    </div>
                  ) : null}
                  {auctionDateTime > new Date().getTime() ? (
                    <form onSubmit={bid}>
                      <div className="block mt-4 w-1/2">
                        {/* <div className="flex items-center justify-between mb-2">
                      <div className="badge badge-md mr-2">1000</div>
                      <div className="badge badge-md mr-2">1000</div>
                      <div className="badge badge-md mr-2">1000</div>
                      <div className="badge badge-md">1000</div>
                    </div> */}
                        <input
                          type="text"
                          placeholder="₹1000"
                          value={`${bidAmount ? "₹" + bidAmount : ""}`}
                          onChange={(e) => handleAmountChange(e)}
                          className="input input-bordered w-full max-w-xs"
                        />
                      </div>
                      <button
                        className="btn btn-primary mt-4 px-8"
                        disabled={submitDisabled}
                      >
                        Place a Bid
                      </button>
                    </form>
                  ) : null}
                </div>

                <div id="StarterContent" className="mt-6">
                  <div
                    className=""
                    id="wednesday"
                    role="tabpanel"
                    aria-labelledby="wednesday-tab"
                  >
                    <div className="grid grid-cols-1">
                      {lastFiveBids &&
                        lastFiveBids.map((bid) => (
                          <div className="flex items-center mt-4">
                            <div className="relative inline-block">
                              <img
                                src={
                                  bid.photoURL ||
                                  `https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80`
                                }
                                className="h-16 rounded-md"
                                alt=""
                              />
                              <i className="mdi mdi-check-decagram text-emerald-600 text-lg absolute -top-2 -end-2" />
                            </div>
                            <div className="ms-3">
                              <h6 className="font-semibold">
                                ₹{bid?.text}{" "}
                                <span className="text-slate-400">by</span>{" "}
                                <a
                                  href="#"
                                  className="hover:text-violet-600 duration-500 ease-in-out"
                                >
                                  {bid.displayName}
                                </a>
                              </h6>
                              <span className="text-slate-400 text-[16px]">
                                {bid.createdAt &&
                                  moment(
                                    moment(
                                      DateTime.fromMillis(
                                        bid?.createdAt?.seconds * 1000 +
                                          Math.floor(
                                            bid?.createdAt?.nanoseconds /
                                              1000000
                                          )
                                      ).toISO()
                                    )
                                      .utcOffset("+05:30")
                                      .format("DDMMYYYY h:mm:ss a"),
                                    "DDMMYYYY h:mm:ss a"
                                  ).fromNow()}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    className="hidden"
                    id="thursday"
                    role="tabpanel"
                    aria-labelledby="thursday-tab"
                  >
                    <div className="grid grid-cols-1">
                      <div className="flex items-center">
                        <div className="relative inline-block">
                          <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                            className="h-20 rounded-md"
                            alt=""
                          />
                          <i className="mdi mdi-check-decagram text-emerald-600 text-lg absolute -top-2 -end-2" />
                        </div>
                        <span className="content ms-3">
                          <a
                            href=""
                            className="hover:text-violet-600 font-semibold block"
                          >
                            Digital Art Collection
                          </a>
                          <span className="text-slate-400 block text-[16px] mt-1">
                            Started Following{" "}
                            <a
                              href=""
                              className="font-semibold hover:text-violet-600"
                            >
                              @Panda
                            </a>
                          </span>
                          <span className="text-slate-400 block text-[16px]">
                            1 hours ago
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auction;
