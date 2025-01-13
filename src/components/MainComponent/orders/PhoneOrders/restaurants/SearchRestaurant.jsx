    import React from 'react'
    import PropsSearchBox from '../../../../GeneralComponent/SearchBox/PropsSearchBox'
    import { useState } from 'react';
    import ratingstar from '../../../../../assets/images/ratingstar.svg';
    import { useDispatch, useSelector } from 'react-redux';
    import search from '../../../../../assets/images/prime_search.svg';
    import { fetchMerchantSearchApi, selectMerchantData, selectMerchnatError, selectMerchantLoading } from '../../../../../redux/slices/merchant';
    import { useNavigate } from 'react-router-dom';

    const SearchRestaurant = () => {
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const [searchTerm, setSearchTerm] = useState('');
        const restaurants = useSelector(selectMerchantData)
        const loading = useSelector(selectMerchantLoading)


        const handleSearch = (term) => {
            setSearchTerm(term);
            dispatch(fetchMerchantSearchApi({ name: term }));
        }

        const getTimingForToday = (timings) => {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const currentDay = new Date().getDay();
            return timings[daysOfWeek[currentDay]] || 'No timings available';
        };
        const handleRestaurantClick = (restaurantId) =>{
            navigate(`/orders/phone-orders/searchrestaurant/customerdetail/${restaurantId}`)
        }

        return (
            <div>


                <div className='mt-8'>
                    <div className='mb-8'>
                        <h1 className="text-2xl font-bold mb-6">Search Restaurant</h1>
                        <PropsSearchBox placeholder={"search Restaurant name, Id etc.."}
                            img={search}
                            onSearch={handleSearch} />
                    </div>

                    {/* Loading Indicator */}
                    {loading && <p>Loading...</p>}
                    {/* Grid */}
                    <div className="grid grid-cols-5 gap-6">
                        
                        {restaurants.map((restaurant, index) => (
                            <div key={index} 
                            onClick={()=>handleRestaurantClick(restaurant.restaurant_id)}
                            className="flex flex-col ">
                                {/* Image */}
                                <div className="w-full h-48 rounded-2xl  overflow-hidden">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>




                                {/* Restaurant Name */}
                                <h2 className="text-lg font-semibold mt-4">{restaurant.name}</h2>

                                {/* Rating, Timing */}
                                <div className="flex  text-gray-600 mt-2">
                                    <span className="flex items-center mr-4">
                                        <img src={ratingstar} alt="rating" />
                                        {restaurant.average_rating}
                                    </span>
                                    <p className="text-gray-500 mt-2">
                                        
                                        {getTimingForToday(restaurant.opening_hours)}
                                    </p>
                                </div>

                                {/* Address */}
                                <p className="text-gray-500  mt-2">{restaurant.street_address_1},{restaurant.street_address_2}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    export default SearchRestaurant
