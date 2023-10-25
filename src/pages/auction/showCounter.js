import DateTimeDisplay from "./DateTimeDisplay";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
      </div>
      <span className="text-gray-900">:</span>
      <div className="flex flex-col items-center justify-center">
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
      </div>
      <span className="text-gray-900">:</span>
      <div className="flex flex-col items-center justify-center">
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
      </div>
      <span className="text-gray-900">:</span>
      <div className="flex flex-col items-center justify-center">
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </div>
    </>
  );
};

export default ShowCounter;
