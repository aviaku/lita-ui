import React from "react";

const DateTimeDisplay = ({ value, type, isDanger }) => {

  return (
    <>
        <p className="text-gray-900 dark:text-white font-semibold">
        {value}
        </p>
        <small className="text-gray-700 dark:text-gray-400 text-xs">
        {type}
        </small>
    </>
  );
};

export default DateTimeDisplay;
