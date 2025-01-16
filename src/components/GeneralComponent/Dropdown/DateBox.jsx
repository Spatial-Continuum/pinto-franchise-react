import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  // Import CSS for the date picker
// import '../../assets/styles/dateBox.css';

const DateBox = () => {
  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle when a day is selected (on click)
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Handle when the value changes (via input or other events)
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className=" bg-white-600 border-[1px]  rounded-md  h-10 ml-0 ">
      {/* Date Picker Button */}
      <DatePicker
        selected={selectedDate}
        onSelect={handleDateSelect} // When a day is clicked
        onChange={handleDateChange} // When the value changes
        dateFormat="yyyy-MM-dd"  // Format the date
        className="  bg-[#FFFFFF] border-[#A7D7FF] border-[1px] rounded-sm  h-10 text-center "  // Custom styling for the date picker
        placeholderText="Select Date"
      />

      
    </div>
  );
};

export default DateBox;
