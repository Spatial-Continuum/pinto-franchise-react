import { Proportions } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PropsSearchBox from '../../../../../components/GeneralComponent/SearchBox/PropsSearchBox'
import restaurant2 from '../../../../../assets/images/restaurant.png'
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantList, selectRestaurantList } from '../../../../../redux/slices/restaurant'
import { fetchMerchantSearchApi, selectMerchantData, selectMerchantLoading } from '../../../../../redux/slices/merchant'

const NewOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('');
  const restaurants = useSelector(selectMerchantData)
  const allRestaurants = useSelector(selectRestaurantList)
  const loading = useSelector(selectMerchantLoading)


  useEffect(() => {
    dispatch(getRestaurantList())
  }, [dispatch])

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch(fetchMerchantSearchApi({ name: term }));
  }

  const getTimingForToday = (timings) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date().getDay();
    return timings[daysOfWeek[currentDay]] || 'No timings available';
  };
  const handleRestaurantClick = (restaurantId) => {
    navigate(`/orders/phone-orders/searchrestaurant/customerdetail/${restaurantId}`)
  }
  const displayedRestaurants = searchTerm ? restaurants : allRestaurants;
  console.log("displayedRestaurants", displayedRestaurants);
  return (
    <div>
      <MainLayout>
        <div>
          <h2 className='mb-3 font-semibold text-xl'>New Order</h2>
          <PropsSearchBox placeholder={"search Restaurant name,id,etc"} />
        </div>


        <div className='mt-8'>
          <h1 className="text-xl font-semibold mb-6">Top restaurants in Coimbatore</h1>

          {/* Grid */}
          <div className="grid grid-cols-5 gap-6">
            {displayedRestaurants.map((restaurant, index) => (
              <div key={index} className="flex flex-col " onClick={() => navigate('/orders/category')}>
                {/* Image */}
                <div className="w-full h-48 rounded-2xl  overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Restaurant Name */}
                <h2 className="text-lg font-semibold mt-2">{restaurant.name}</h2>

                {/* Rating, Timing */}
                <div className="flex  text-gray-600 mt-1">
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
      </MainLayout>

    </div>
  )
}

export default NewOrder
