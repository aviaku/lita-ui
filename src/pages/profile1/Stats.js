const Stats = () => {
    return (
      <div className="stats shadow w-full">
        <div className="stat place-items-center">
          <div className="stat-title">Matches</div>
          <div className="stat-value">31K</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Reviews</div>
          <div className="stat-value">4,200</div>
          <div className="rating rating-xs">
            <input
              disabled
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              disabled
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              disabled
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              disabled
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              disabled
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>
      </div>
    );
}

export default Stats;