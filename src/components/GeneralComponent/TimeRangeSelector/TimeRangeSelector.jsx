import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FiClock } from "react-icons/fi";

const TimeRangeSelector = ({ value, onChange, disabled, compact }) => {
  const parse24HourTime = (timeStr) => {
    const [hourStr, minuteStr] = timeStr.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    let period = 'AM';
    if (hour >= 12) {
      period = 'PM';
    }
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
    return {
      hour: hour.toString().padStart(2, '0'),
      minute,
      period,
    };
  };

  const formatTimeTo24Hour = (time) => {
    let hour = parseInt(time.hour, 10);
    const minute = time.minute;
    if (time.period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (time.period === 'AM' && hour === 12) {
      hour = 0;
    }
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  };

  const [startTime, setStartTime] = useState(() => {
    const [start] = value.split(' - ');
    return parse24HourTime(start || '09:00');
  });

  const [endTime, setEndTime] = useState(() => {
    const [, end] = value.split(' - ');
    return parse24HourTime(end || '17:00');
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const [newStart, newEnd] = value.split(' - ');
    setStartTime(parse24HourTime(newStart || '09:00'));
    setEndTime(parse24HourTime(newEnd || '17:00'));
  }, [value]);

  const hours = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")), []
  );

  const minutes = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0")), []
  );

  const validateTimeRange = useCallback(() => {
    const start24 = formatTimeTo24Hour(startTime);
    const end24 = formatTimeTo24Hour(endTime);
    const startMinutes = parseInt(start24.split(':')[0]) * 60 + parseInt(start24.split(':')[1]);
    const endMinutes = parseInt(end24.split(':')[0]) * 60 + parseInt(end24.split(':')[1]);

    if (endMinutes <= startMinutes) {
      setError("End time must be after start time");
      return false;
    }
    setError("");
    return true;
  }, [startTime, endTime]);

  const handleTimeChange = (timeType, field, value) => {
    if (disabled) return;
    const setter = timeType === "start" ? setStartTime : setEndTime;
    setter(prev => {
      const newTime = { ...prev, [field]: value };
      return newTime;
    });
  };

  useEffect(() => {
    if (validateTimeRange()) {
      const start24 = formatTimeTo24Hour(startTime);
      const end24 = formatTimeTo24Hour(endTime);
      onChange(`${start24} - ${end24}`);
    }
  }, [startTime, endTime, onChange, validateTimeRange]);

  const TimeSelect = ({ timeType, time }) => (
    <div className={`flex flex-col ${compact ? 'space-y-1' : 'space-y-2'}`}>
      {!compact && (
        <label className="text-sm font-medium text-gray-700">
          {timeType === "start" ? "Start Time" : "End Time"}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <div className="relative">
          <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={time.hour}
            onChange={(e) => handleTimeChange(timeType, "hour", e.target.value)}
            className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={disabled}
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>{hour}</option>
            ))}
          </select>
        </div>
        <span className="text-gray-500">:</span>
        <select
          value={time.minute}
          onChange={(e) => handleTimeChange(timeType, "minute", e.target.value)}
          className={`px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={disabled}
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>{minute}</option>
          ))}
        </select>
        <div className="flex space-x-1 border border-gray-300 rounded-md p-1 bg-white">
          {["AM", "PM"].map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => handleTimeChange(timeType, "period", period)}
              className={`px-3 py-1 rounded ${
                time.period === period 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              } ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={disabled}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${compact ? 'space-y-2' : 'space-y-4'} ${error ? 'border border-red-500 rounded p-2' : ''}`}>
      <div className={`${compact ? 'flex space-x-2 items-center' : 'space-y-2 md:grid md:grid-cols-2 md:gap-2'}`}>
        <TimeSelect timeType="start" time={startTime} />
        <TimeSelect timeType="end" time={endTime} />
      </div>
      {!compact && error && (
        <div className="mt-1 text-xs text-red-600">{error}</div>
      )}
    </div>
  );
};

export default TimeRangeSelector;