import React from "react";
import rating from '../../../../assets/images/rating.svg';
const M_lovedRestaurant = () => {
  const restaurants = [
    {
      image: "https://via.placeholder.com/100",
      name: "The Gourmet Kitchen",
      address: "123 Food Street, Flavor Town",
      timings: "10am - 10pm",
      ratings: "1.2k",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Bistro Delight",
      address: "456 Culinary Ave, Tasty City",
      timings: "11am - 9pm",
      ratings: "900",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Sushi Central",
      address: "789 Sushi Blvd, Fish Town",
      timings: "12pm - 10pm",
      ratings: "2.5k",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "The Gourmet Kitchen",
      address: "123 Food Street, Flavor Town",
      timings: "10am - 10pm",
      ratings: "1.2k",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Bistro Delight",
      address: "456 Culinary Ave, Tasty City",
      timings: "11am - 9pm",
      ratings: "900",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Sushi Central",
      address: "789 Sushi Blvd, Fish Town",
      timings: "12pm - 10pm",
      ratings: "2.5k",
    },{
      image: "https://via.placeholder.com/100",
      name: "The Gourmet Kitchen",
      address: "123 Food Street, Flavor Town",
      timings: "10am - 10pm",
      ratings: "1.2k",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Bistro Delight",
      address: "456 Culinary Ave, Tasty City",
      timings: "11am - 9pm",
      ratings: "900",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Sushi Central",
      address: "789 Sushi Blvd, Fish Town",
      timings: "12pm - 10pm",
      ratings: "2.5k",
    },

  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Most Loved Restaurants</h2>
        <button className="text-white bg-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-600">
          + Restaurant
        </button>
      </div>

      {/* Sub-header */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
        <p>{restaurants.length} Restaurants</p>
        <button className="text-orange-500 hover:underline">View All</button>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3  mr-80 gap-6">
        
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white flex"
          >
            {/* Left: Image */}
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />

            {/* Right: Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <p className="text-sm text-gray-500">{restaurant.address}</p>
                <p className="text-sm text-gray-500">Timings: {restaurant.timings}</p>
              </div>
              <div className="flex items-center text-sm gap-2 text-gray-500">
                <img src={rating} alt="rating" />
                {restaurant.ratings} Ratings
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default M_lovedRestaurant;
