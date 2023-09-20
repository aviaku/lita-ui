import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Carousel, ScrollingCarousel } from "@trendyol-js/react-carousel";
import Cookies from "js-cookie";
import Card1 from "../../components/card/card1";
import Card2 from "../../components/card/Card2";
import Card3 from "../../components/card/Card3";
import Footer from "../../components/footer/Index";
import "./style.css";
import pageBackground from "../../page-background.png";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import Nav from "../../components/headerNoAuth/index";
import Card5 from "../../components/card/card5";
export default function Landing({ setVisible, posts, loading, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("User", user);
  const middle = useRef(null);
  const [height, setHeight] = useState();
  const [games, setGames] = useState([]);
  const [auctions, setAuctions] = useState([]);

  const apiEndpoint = process.env.REACT_APP_BACKEND_URL;

  const players = [
    {
      name: "Jenny Chachi",
      games: [],
      star: 5,
      minBid: 1000,
      isLiked: false,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    },
    {
      name: "Sofia Chachi",
      games: [],
      star: 5,
      minBid: 1000,
      isLiked: false,
      image:
        "https://i.pinimg.com/736x/5a/ce/18/5ace18da55f335a5e4df3c47913aeb58.jpg",
    },
    {
      name: "Albert Chacha",
      games: [],
      star: 5,
      minBid: 1000,
      isLiked: false,
      image:
        "https://variety.com/wp-content/uploads/2022/12/Chadwick-1.jpg?w=1000",
    },
    {
      name: "Jasmine Chachi",
      games: [],
      rating: 5,
      minBid: 1000,
      isLiked: false,
      image:
        "https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/photo-of-woman-wearing-yellow.jpg",
    },
    {
      name: "Jasmine Chachi",
      games: [],
      rating: 5,
      minBid: 1000,
      isLiked: false,
      image:
        "https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/photo-of-woman-wearing-yellow.jpg",
    },
    {
      name: "Jasmine Chachi",
      games: [],
      rating: 5,
      minBid: 1000,
      isLiked: false,
      image:
        "https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/photo-of-woman-wearing-yellow.jpg",
    },
  ];

  const auctionList = async () => {
    try {
      const res = await axios.post(
        `${apiEndpoint}/getActiveAuctions`,
        { status: "ACTIVE" }
      );
      console.log("🚀 ~ file: index.js:17 ~ auctions ~ res:", res);
      setAuctions(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  const playerss = async () => {
    try {
      const res = await axios.get(
        `${apiEndpoint}/getGamers`
      );
      console.log("🚀 ~ file: index.js:17 ~ Players ~ res:", res);
      // setAuctions(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  const gameList = async () => {
    try {
      const res = await axios.get(`${apiEndpoint}/getAllGames`);
      console.log("🚀 ~ file: index.js:17 ~ games ~ res:", res);
      setGames(res.data);
    } catch (error) {
      console.log("🚀 ~ file: index.js:26 ~ gameList ~ error:", error);
    }
  };

  useEffect(() => {
    if(!auctions.length)
      auctionList();
    if(!games.length)
      gameList();
    // if (!players.length) 
    playerss();
  }, []);

  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  return (
    <div className="!h-full" style={{ height: `${height + 150}px` }}>
      {/* <Nav /> */}
      <Header />
      {/* <LeftHome user={user} /> */}
      <div className="relative w-full" ref={middle}>
        {/* <Nav /> */}
        <div className="relative animated-bg">
          <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
            <div className="flex items-center flex-wrap px-2 md:px-0">
              <div className="relative lg:w-5/12 lg:py-24 xl:py-32">
                <h1 className="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">
                  Play your fevorite games, with pro gamers
                </h1>
                {/* <form action="" className="w-full mt-12">
                  <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
                    <select
                      className="hidden p-3 rounded-full bg-transparent md:block md:p-4 w-full"
                      name="domain"
                      id="domain"
                    >
                      <option value="pubg">PubG</option>
                      <option value="freefire">Free Fire</option>
                      <option value="codmobile">COD: Mobile</option>
                    </select>
                    <input
                      placeholder="Your favorite food"
                      className="w-full p-4 rounded-full"
                      type="text"
                    />
                    <button
                      type="button"
                      title="Start buying"
                      className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
                    >
                      <span className="hidden text-yellow-900 font-semibold md:block">
                        Search
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 mx-auto text-yellow-900 md:hidden bi bi-search"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </div>
                </form> */}
                <p className="mt-8 text-gray-700 lg:w-10/12">
                  Sit amet consectetur adipisicing elit.{" "}
                  <a href="#" className="text-yellow-700">
                    connection
                  </a>{" "}
                  tenetur nihil quaerat suscipit, sunt dignissimos.
                </p>
              </div>
              <div className="ml-auto lg:w-6/12">
                <img
                  src="https://www.datocms-assets.com/92583/1675427370-pubg-stryda.png"
                  className="relative"
                  alt="food illustration"
                  loading="lazy"
                  width="4500"
                  height="4500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* Card component */}
      {/* <div>
        <div className="md:grid grid-cols-4 gap-4 m-10">
          <div className="p-3 drop-shadow-xl rounded-xl bg-slate-400">
            <img
              className="rounded-xl"
              src="https://img.freepik.com/free-photo/dreamy-young-woman-sunglasses-looking-front_197531-16739.jpg"
              alt="abc"
            />
            <div></div>
          </div>
          <div>09</div>
        </div>
      </div> */}
      <div className="relative">
        {/* <div className="absolute top-0 left-8 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob overflow-hidden"></div>
        <div className="absolute top-0 right-40 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob overflow-hidden animation-delay-2000"></div>
        <div className="absolute bottom-48 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob overflow-hidden animation-delay-3000"></div>
        <div className="absolute bottom-0 right-36 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob overflow-hidden animation-delay-4000"></div> */}
        <div className="flex items-center">
          <div className="container ml-auto mr-auto flex flex-wrap items-start">
            <div className="w-full pl-5 lg:pl-2 mb-4 mt-4 flex items-center justify-between">
              <h1 className="text-3xl lg:text-4xl text-gray-700 font-bold">
                Top Gamers
              </h1>
              <Link to="/gamers">
                <button className="top-6 right-6 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                  <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                    <i className="right_icon"></i>
                  </div>
                </button>
              </Link>
            </div>
            <ScrollingCarousel>
              {players.map((player) => (
                <Card1
                  name={player.name}
                  star={player.star}
                  isLiked={player.isLiked}
                  image={player.image}
                  minBid={player.minBid}
                />
              ))}
            </ScrollingCarousel>
          </div>
        </div>
        <br />
        <div className="flex items-center">
          <div className="container ml-auto mr-auto flex flex-wrap items-start">
            <div className="w-full pl-5 lg:pl-2 mb-4 mt-4 flex items-center justify-between">
              <h1 className="text-3xl lg:text-4xl text-gray-700 font-bold">
                Top Games
              </h1>
              <button className="top-6 right-6 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                  <i className="right_icon"></i>
                </div>
              </button>
            </div>
            <ScrollingCarousel>
              {games.map((game) => (
                <Card2 name={game.name} picture={game.picture} />
              ))}
            </ScrollingCarousel>
          </div>
        </div>
        <br />
        <div className="flex items-center">
          <div className="container ml-auto mr-auto flex flex-wrap items-start">
            <div className="w-full pl-5 lg:pl-2 mb-4 mt-4 flex items-center justify-between">
              <h1 className="text-3xl lg:text-4xl text-gray-700 font-bold">
                Live Auctions
              </h1>
              <Link to="/auctions">
                <button className="top-6 right-6 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                  <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                    <i className="right_icon"></i>
                  </div>
                </button>
              </Link>
            </div>
            <ScrollingCarousel>
              {auctions &&
                auctions.map((auction) => (
                  <Card3
                    _id={auction._id}
                    basePrice={auction.basePrice}
                    dateTime={auction.dateTime}
                    game={auction.game}
                    user={auction.user}
                    bids={auction.bid}
                  />
                ))}
            </ScrollingCarousel>
          </div>
        </div>
        <br />
        {/* <div className="flex items-center">
          <div className="container ml-auto mr-auto flex flex-wrap items-start">
            <div className="w-full pl-5 lg:pl-2 mb-4 mt-4 flex items-center justify-between">
              <h1 className="text-3xl lg:text-4xl text-gray-700 font-bold">
                Live Auctions
              </h1>
              <button className="top-6 right-6 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                  <i className="right_icon"></i>
                </div>
              </button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 md:mx-0 gap-4">
              <Card5 image="https://images.macrumors.com/t/w75aG9DhHKhoJv3OyV-OWqXqgUg=/1600x1200/smart/article-new/2017/12/pubg.jpg" />
              <Card5 image="https://venturebeat.com/wp-content/uploads/2020/05/Garena-Free-Fire.jpg?w=1200&strip=all" />
              <Card5 image="https://images.macrumors.com/t/w75aG9DhHKhoJv3OyV-OWqXqgUg=/1600x1200/smart/article-new/2017/12/pubg.jpg" />
              <Card5 image="https://images.macrumors.com/t/w75aG9DhHKhoJv3OyV-OWqXqgUg=/1600x1200/smart/article-new/2017/12/pubg.jpg" />
            </div>
          </div>
        </div> */}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <RightHome user={user} /> */}
      <Footer />
    </div>
  );
}
