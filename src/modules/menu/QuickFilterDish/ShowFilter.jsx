import React, { useEffect, useState } from 'react';
import RestaurantService from '../../restaurants/RestaurantService';
import vector from '../../../assets/images/vector.svg'
import gala from '../../../assets/images/gala_add.svg'

const ShowFilter = () => {
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const data = await RestaurantService.getAllDishFilters();
                setFilters(data); // Assuming `data` is an array of filter objects
            } catch (err) {
                console.error("Error fetching filters:", err);
                setError("Failed to load filters");
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, []);

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="px-4">
            <div className='flex flex-row justify-between '>
                <h2 className="text-lg font-semibold mb-4">Quick filter</h2>
                <p className='mr-96'>view All</p>
            </div>
            <div className="flex flex-wrap gap-4">
                {filters.map((filter) => (
                    <div
                        key={filter.quickfilter_id}
                        className="w-56 h-28 flex flex-col relative border border-[#EDEDED] rounded-sm shadow-md bg-[#FFFFFF] text-gray-800 text-sm font-medium"
                    >
                        {/* Vector image in top-right */}
                        <img
                            src={vector}
                            className="absolute top-2 right-2 w-4 h-4"
                            alt="vector"
                        />
                        {/* Centered title */}
                        <div className="flex items-center justify-center h-full">
                            <h6 className="text-center">{filter.filter_title}</h6>
                        </div>
                        
                    </div>
                ))}
                <div className="w-56 h-28 flex gap-2 justify-center items-center border border-[#FB6B00] rounded-sm shadow-md bg-[#FFFFFF] text-gray-800 text-sm font-normal">
                    <img src={gala} />
                    <p>Add New</p>
                </div>
            </div>

        </div>
    );
};

export default ShowFilter;
