import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
// import "react-datepicker-time/dist/react-datepicker-time.css";

const DateTimePicker = ({
  handleDateChange,
  selectedDate,
  handleChange,
  handleBlur,
  name,
}) => {
  // const [selectedDate, setSelectedDate] = useState(null);

  const hour = new Date().getHours();

  return (
    <div>
      <DatePicker
        name={name}
        selected={selectedDate}
        onChange={handleChange}
        onBlur={handleBlur}
        minDate={new Date()}
        minTime={
          selectedDate > new Date()
            ? setHours(setMinutes(new Date(), 0), 0)
            : setHours(setMinutes(new Date(), 0), hour + 1)
        }
        maxTime={setHours(setMinutes(new Date(), 59), 23)}
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
