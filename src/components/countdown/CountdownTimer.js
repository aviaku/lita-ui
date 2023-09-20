import React from "react";
import { useCountdown } from "./useCountdown";
import ShowCounterComp from "./showCounter";
import ExpiredNoticeComp from "./expiredNotice";

const CountdownTimerComp = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNoticeComp />;
  } else {
    return (
      <ShowCounterComp
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimerComp;