import { Link } from "react-router-dom";
import CountdownTimerComp from "../countdown/CountdownTimer";

const Card3 = ({_id, basePrice, dateTime, game, user, bids}) => {

  return (
    <Link
      to={`/auction/${_id}`}
      className="w-full md:w-1/3 lg:w-1/5 lg:pl-2 lg:pr-2 p-4"
    >
      <div className="card bg-base-100 rounded-lg transform">
        <div className="m-h-64 relative rounded-t-lg">
          <figure className="">
            <img
              src={user.picture || game.picture}
              alt=""
              className="ml-auto mr-auto object-cover rounded-t-lg h-36 w-96"
            />
            <div className="absolute bg-red-100 font-semibold px-2.5 py-1 rounded-lg text-red-500 text-xs top-2.5 left-2.5">
              {" "}
              Trending{" "}
            </div>
          </figure>
        </div>
        <div className="card-body p-2 pt-0 flex flex-col rounded-b-lg">
          <div className="flex items-center justify-between px-1 md:items-start mt-3">
            <div className="mb-2">
              {/* <p className="text-red-600 font-semibold">05:19:04</p> */}
              <CountdownTimerComp targetDate={new Date(dateTime).getTime()} />
              <p className="text-xl font-semibold text-slate-600">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-slate-500 text-sm font-medium mt-2">
                {game.name}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500 capitalize">
                <div> {bids ? bids.length : 0} intersted</div>
                <div>·</div>
                <div> 2 going </div>
              </div>
            </div>
          </div>
        </div>
        <button
          href=""
          className="w-full linear rounded-[10px] hover:translate-y-1 hover:shadow-md bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 px-4 py-2 text-base font-medium transition duration-200"
        >
          Bid Now
        </button>
      </div>
    </Link>
  );
};

export default Card3;
