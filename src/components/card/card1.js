import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Card1 = ({name, image, star, games, minBid, username}) => {

  const { user } = useSelector((state) => ({ ...state }));

  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setProfile(data);
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, [username]);

    return (
      <Link
        to={`/profile/${username}`}
        className="w-full md:w-1/2 lg:w-1/4 lg:pl-2 lg:pr-2 p-4"
      >
        <div className="bg-base-100 rounded-lg transform hover:translate-y-2 hover:shadow-xl transition duration-300">
          <div className="p-4 m-h-64 relative rounded-t-lg">
            <figure className="">
              <img
                src={image}
                alt=""
                className="ml-auto mr-auto object-cover rounded-md h-72 w-96"
              />
            </figure>
          </div>
          {/* <button className="absolute top-6 right-6 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
              <AiOutlineHeart />
            </div>
          </button> */}
          <div className="p-4 pt-0 flex flex-col rounded-b-lg">
            <div className="mb-3 flex items-center w-full justify-between px-1 md:items-start">
              <div className="mb-2">
                <p className="text-lg font-bold text-gray-700"> {name} </p>
                {/* <div className="flex items-center">
                  <AiFillStar className="text-yellow-400" />
                  <AiFillStar className="text-yellow-400" />
                  <AiFillStar className="text-yellow-400" />
                  <AiFillStar className="text-yellow-400" />
                  <AiFillStar />
                </div> */}
              </div>
              <div className="profile_friend_imgs">
                {profile?.friends &&
                  profile.friends.slice(0, 6).map((friend, i) => (
                    <Link to={`/profile/${friend.username}`} key={i}>
                      <img
                        src={friend.picture}
                        alt=""
                        style={{
                          transform: `translateX(${-i * 7}px)`,
                          zIndex: `${i}`,
                        }}
                      />
                    </Link>
                  ))}
              </div>
            </div>
            <div className="flex items-center justify-between md:items-center lg:justify-between ">
              {/* <div className="flex">
                <p className="!mb-0 text-sm font-semibold text-blue-500">
                  Minimum Bid: <span>₹</span>
                  {minBid}
                </p>
              </div> */}
              <a
                href="#_"
                class="relative inline-flex items-center justify-center p-4 px-4 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
              >
                <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span class="relative text-white">View</span>
              </a>
            </div>
          </div>
        </div>
      </Link>
    );
}
export default Card1;