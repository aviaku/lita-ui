import React from "react";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <>
      <p className="text-gray-900 font-semibold">{value}</p>
      <small className="text-gray-700 text-xs">{type}</small>
    </>
  );
};

export default DateTimeDisplay;
