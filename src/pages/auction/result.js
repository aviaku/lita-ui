const AuctionResult = (props) => {
    // const eligibleBids = []
    console.log("Propssss", props);
  return (
    <div>
      {props.bids && props.bids.map((bid) => (
        <div className="flex items-center mt-4">
          <div className="relative inline-block">
            <img
              src={
                bid.bidBy.picture ||
                `https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80`
              }
              className="h-16 rounded-md"
              alt=""
            />
            <i className="mdi mdi-check-decagram text-emerald-600 text-lg absolute -top-2 -end-2" />
          </div>
          <div className="ms-3">
            <h6 className="font-semibold">
              ₹{bid.amount} <span className="text-slate-400">by</span>{" "}
              <a
                href="#"
                className="hover:text-violet-600 duration-500 ease-in-out"
              >
                {bid.bidBy.first_name}
              </a>
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuctionResult;