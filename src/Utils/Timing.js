export const getCurrentDayHours = (openingHours) => {
    const daysOfWeek = [

      "Friday", "Monday", "Sunday",  "Tuesday", "Saturday",  "Thursday","Wednesday"



    ];
    const currentDay = new Date().getDay();
    const currentDayName = daysOfWeek[currentDay];
    const CurrentDayHours = openingHours[currentDayName] || "Hours not available";
    return `${CurrentDayHours}`;
};