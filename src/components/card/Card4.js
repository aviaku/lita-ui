import { AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const Card4 = ({ name, image, star, games, minBid }) => {
  return (
    <Link to="/profile" className="w-full">
      <div className="bg-base-100 rounded-lg transform hover:translate-y-2 hover:shadow-xl transition duration-300 drop-shadow-lg">
        <div className="pb-4 m-h-64 relative rounded-t-lg">
          <figure className="">
            <img
              src={image}
              alt=""
              className="ml-auto mr-auto object-cover rounded-t-lg h-72 w-96"
            />
          </figure>
        </div>
        <button className="absolute top-6 right-6 flex items-center justify-center rounded-full p-2 text-brand-500 hover:cursor-pointer">
          <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
            <AiOutlineHeart />
          </div>
        </button>
        <div className="card-body p-4 pt-0 flex flex-col rounded-b-lg">
          <div className="mb-3 flex items-center justify-between px-1 md:items-start">
            <div className="mb-2">
              <p className="text-md font-semibold text-gray-700"> {name} </p>
              <div className="flex items-center">
                <AiFillStar className="text-yellow-400 text-sm" />
                <AiFillStar className="text-yellow-400 text-sm" />
                <AiFillStar className="text-yellow-400 text-sm" />
                <AiFillStar className="text-yellow-400 text-sm" />
                <AiFillStar />
              </div>
            </div>
            <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
              <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
                +5
              </span>
              <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
                  alt=""
                />
              </span>
              <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png"
                  alt=""
                />
              </span>
              <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar3.9f646ac5920fa40adf00.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between md:items-center lg:justify-between ">
            <div className="flex">
              <p className="!mb-0 text-xs text-blue-500">
                Minimum Bid: <span>₹</span>
                {minBid}
              </p>
            </div>
            <button href="" className="btn btn-xs btn-warning rounded-xl">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Card4;
