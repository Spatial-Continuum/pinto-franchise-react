import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  // Import CSS for the date picker
import '../../assets/styles/dateBox.css';

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
    <div className="date-box-container">
      {/* Date Picker Button */}
      <DatePicker
        selected={selectedDate}
        onSelect={handleDateSelect} // When a day is clicked
        onChange={handleDateChange} // When the value changes
        dateFormat="yyyy-MM-dd"  // Format the date
        className="date-picker"  // Custom styling for the date picker
        placeholderText="Select Date"
      />

      {/* Display the selected date inside a box */}
      {selectedDate && (
        <div className="selected-date-box">
          <p className="selected-date-text">
            {selectedDate.toISOString().split("T")[0]} {/* Format the date */}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateBox;
