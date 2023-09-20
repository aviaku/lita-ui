import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
// import "react-datepicker-time/dist/react-datepicker-time.css";

const DateTimePicker = ({handleDateChange, selectedDate, handleChange, handleBlur, name}) => {
  // const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        name={name}
        selected={selectedDate}
        onChange={handleChange}
        onBlur={handleBlur}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  );
};

export default DateTimePicker;
