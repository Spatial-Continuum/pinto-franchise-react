import React, { useEffect, useState } from 'react';
import RestaurantService from '../../restaurants/RestaurantService';
import gala from '../../../assets/images/gala_add.svg';

const ShowCuisine = () => {
    const [cuisines, setCuisines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCuisines = async () => {
            try {
                const data = await RestaurantService.getAllCuisines();
                setCuisines(data); // Assuming `data` is an array of cuisines
            } catch (err) {
                console.error('Error fetching cuisines:', err);
                setError('Failed to load cuisines');
            } finally {
                setLoading(false);
            }
        };

        fetchCuisines();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="flex ml-5 justify-between">
                <h2 className="text-lg font-semibold">Cuisine</h2>
                <p className="mr-96">View all</p>
            </div>
            <div className="flex flex-row ml-5 mt-3 gap-5">
                {cuisines.map((cuisine) => (
                    
                    <div
                        key={cuisine.id}
                        className="w-36 h-36 flex flex-col  justify-center border-[#EDEDED]  rounded-md"
                    >
                        
                        <div className=" w-full h-full flex border-[#F2F2F2] border-[1px] rounded-lg  overflow-hidden bg-[#FFFFFF]">
                            <img
                                src={cuisine.image}
                                alt={cuisine.cuisine_title}
                                className=" object-cover w-full h-full"
                            />
                        </div>
                        <h5 className="text-sm flex text-left text-black mt-1">
                            {cuisine.cuisine_title}
                        </h5>
                        
                    </div>
                    
                    
                ))}
                
                <div className="w-36 h-36 flex flex-col items-center justify-center border-[1px] rounded-md border-[#FF6B00] bg-[#FFFFFF]">
                    <img src={gala} alt="Add new" />
                    <p className='text-xs mt-2'>Add New</p>
                </div>
            </div>
        </div>
    );
};

export default ShowCuisine;
