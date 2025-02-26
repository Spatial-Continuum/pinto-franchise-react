import { Proportions } from 'lucide-react'
import React from 'react'
import PropsSearchBox from '../../../../../components/GeneralComponent/SearchBox/PropsSearchBox'
import restaurant2 from '../../../../../assets/images/restaurant.png'

const NewOrder = () => {
    const restaurants = [
        {
          name: "The Food Lounge",
          image: "src\assets\images\restaurant.png",
          rating: 4.5,
          timing: "30-40 mins",
          address: "123 Main Street, Coimbatore",
        },
        {
          name: "Spicy Bites",
          image: "https://via.placeholder.com/150",
          rating: 4.7,
          timing: "25-35 mins",
          address: "456 Second Avenue, Coimbatore",
        },
        {
          name: "Taste Heaven",
          image: "https://via.placeholder.com/150",
          rating: 4.8,
          timing: "20-30 mins",
          address: "789 Third Boulevard, Coimbatore",
        },
        {
            name: "The Food Lounge",
            image: "https://via.placeholder.com/150",
            rating: 4.5,
            timing: "30-40 mins",
            address: "123 Main Street, Coimbatore",
          },{
            name: "The Food Lounge",
            image: "https://via.placeholder.com/150",
            rating: 4.5,
            timing: "30-40 mins",
            address: "123 Main Street, Coimbatore",
          },{
            name: "The Food Lounge",
            image: "https://via.placeholder.com/150",
            rating: 4.5,
            timing: "30-40 mins",
            address: "123 Main Street, Coimbatore",
          },{
            name: "The Food Lounge",
            image: "https://via.placeholder.com/150",
            rating: 4.5,
            timing: "30-40 mins",
            address: "123 Main Street, Coimbatore",
          },{
            name: "The Food Lounge",
            image: "https://via.placeholder.com/150",
            rating: 4.5,
            timing: "30-40 mins",
            address: "123 Main Street, Coimbatore",
          },{
            name: "The Food Lounge",
            image: "https://via.placeholder.com/150",
            rating: 4.5,
            timing: "30-40 mins",
            address: "123 Main Street, Coimbatore",
          },{
            name: "The Food Lounge",
            image: "https://via.placeholder.com/150",
            rating: 4.5,
            timing: "30-40 mins",
            address: "123 Main Street, Coimbatore",
          },
    ]
    return (
        <div>
            <div>
                <h2 className='mb-3 font-normal text-2xl'>New Order</h2>
                <PropsSearchBox placeholder={"search Restaurant name,id,etc"}/>
            </div>


            <div className='mt-8'>
                <h1 className="text-2xl font-bold mb-6">Top restaurants in Coimbatore</h1>

                {/* Grid */}
                <div className="grid grid-cols-5 gap-6">
                    {restaurants.map((restaurant, index) => (
                        <div key={index} className="flex flex-col ">
                            {/* Image */}
                            <div className="w-full h-48 rounded-2xl  overflow-hidden">
                                <img
                                    src={restaurant2}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Restaurant Name */}
                            <h2 className="text-lg font-semibold mt-4">{restaurant.name}</h2>

                            {/* Rating, Timing */}
                            <div className="flex  text-gray-600 mt-2">
                                <span className="flex items-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-yellow-400 mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.389 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.389-2.46a1 1 0 00-1.175 0l-3.389 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.293 8.397c-.783-.57-.381-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                    </svg>
                                    {restaurant.rating}
                                </span>
                                <span>{restaurant.timing}</span>
                            </div>

                            {/* Address */}
                            <p className="text-gray-500  mt-2">{restaurant.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewOrder
