import DateTimeDisplayComp from "./DateTimeDisplay";

const ShowCounterComp = ({ days, hours, minutes, seconds }) => {

  return (
    <p className="text-red-600 font-semibold">
        <DateTimeDisplayComp value={days} type={"Days"} isDanger={days <= 3} />
      <span className="text-gray-900 dark:text-white">:</span>
        <DateTimeDisplayComp value={hours} type={"Hours"} isDanger={false} />
      <span className="text-gray-900 dark:text-white">:</span>
        <DateTimeDisplayComp value={minutes} type={"Mins"} isDanger={false} />
      <span className="text-gray-900 dark:text-white">:</span>
        <DateTimeDisplayComp value={seconds} type={"Seconds"} isDanger={false} />
    </p>
  );
};

export default ShowCounterComp;
