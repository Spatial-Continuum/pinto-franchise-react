import React, { useEffect, useState } from 'react';
import RestaurantService from '../../restaurants/RestaurantService';
import gala from '../../../assets/images/gala_add.svg';
import vector from '../../../assets/images/vector.svg'
const QuickFilterRestaurant = () => {
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const data = await RestaurantService.getQuickFilterRestaurants();
                setFilters(data); // Assuming data is an array of filters
            } catch (error) {
                console.error("Error fetching quick filter restaurants:", error);
            }
        };

        fetchFilters();
    }, []);

    return (
        <div className="flex flex-col gap-5 mx-5">
            <div className='flex flex-row justify-between'>
                <h2 className='text-lg font-semibold'>Quick filter-Restaurants</h2>
                <p className='text-md text-orange-500'>View All</p>
            </div>

            {/* Displaying the filter cards */}
            <div className="flex  gap-5 flex-wrap">
                {filters.map((filter) => (
                    <div
                        key={filter.quickfilter_id}
                        className="w-64 h-24 flex flex-col relative border border-[#EDEDED] bg-[#FFFFFF] rounded-lg shadow-md"
                    >
                        <img
                            src={vector}
                            className="absolute top-2 right-2 w-4 h-4"
                            alt="vector"
                        />
                        <div className="flex items-center justify-center h-full">
                            <h6 className="text-center text-sm">{filter.filter_name}</h6>
                        </div>
                    </div>
                ))}

                {/* Empty div displayed after the mapped divs */}
                <div className="w-64 h-24 flex items-center justify-center border border-[#FB6B00] bg-[#FFFFFF] rounded-lg shadow-md">
                    <img src={gala} />
                    <p className='ml-3'>Add New</p>
                </div>
            </div>
        </div>
    );
};

export default QuickFilterRestaurant;
