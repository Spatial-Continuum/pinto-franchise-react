import React from 'react';

const MetricsCard = () => {
  return (
    <div className="lg:flex gap-5 ml-4 my-5 items-start md:grid md:grid-cols-2 md:gap-4">
      {/* Card 1 */}
      <div
        className="bg-white border-[3px] border-[#1E99FF] shadow-md rounded-lg w-[188px] h-[124px] flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl text-blue-600 font-bold">50</h1>
        <p className="text-gray-600">Active Partner</p>
      </div>

      {/* Card 2 */}
      <div
        className="bg-white border-[3px] text-orange-600 border-[#FF6B00] shadow-md rounded-lg w-[188px] h-[124px] flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl font-bold">1.5k</h1>
        <p className="text-gray-600">Offline Partner</p>
      </div>

      {/* Card 3 */}
      <div
        className="bg-white border-[3px] text-green-700 border-[#008B0E] shadow-md rounded-lg w-[188px] h-[124px] flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl font-bold">50</h1>
        <p className="text-gray-600">All Partner</p>
      </div>

      {/* Card 4 */}
      <div
        className="bg-white border-[3px] border-gray-300 shadow-md rounded-lg w-[188px] h-[124px] flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl font-bold">+</h1>
        <p className="text-gray-600">New Partner</p>
      </div>
    </div>
  );
};

export default MetricsCard;
