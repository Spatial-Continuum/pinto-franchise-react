import React, { useEffect, useState } from 'react';
import RestaurantService from '../../restaurants/RestaurantService';
import gala from '../../../assets/images/gala_add.svg';
import vector from '../../../assets/images/vector.svg';

const ShowTopBrand = () => {
    const [topBrands, setTopBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopBrands = async () => {
            try {
                const data = await RestaurantService.getTopBrands();
                setTopBrands(data); // Assuming `data` is an array of top brands
            } catch (err) {
                console.error('Error fetching top brands:', err);
                setError('Failed to load top brands');
            } finally {
                setLoading(false);
            }
        };

        fetchTopBrands();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col gap-5 mx-5">
            <div className="flex flex-row flex-wrap gap-5 mt-3 mb-2 justify-between">
                <h2 className="text-lg font-semibold">TopBrands</h2>
                <p className="text-md">view All</p>
            </div>
            <div className="flex flex-row flex-wrap gap-5">
                {/* Mapping topBrands */}
                {topBrands.map((brand) => (
                    <div
                        key={brand.top_restaurant_id}
                        className="w-36 h-36 flex flex-col items-center justify-center border border-[#EDEDED] bg-[#FFFFFF] rounded-lg shadow-md"
                    >
                        <img
                            src={vector}
                            className="absolute top-2 right-2 w-4 h-4"
                            alt="vector"
                        />

                        <div className="flex w-items-center justify-center overflow-hidden rounded-full bg-gray-100">
                            <img
                                src={brand.restaurant.image} // Assuming `brand.restaurant.image` contains the image URL
                                alt={brand.restaurant.name}
                                className="object-cover w-20 h-20"
                            />
                        </div>
                        <h6 className="text-sm text-center mt-3">{brand.restaurant.name}</h6>
                    </div>
                ))}

                {/* Empty div to appear after mapped items */}
                <div className="w-36 h-36 flex flex-col items-center justify-center border border-[#FB6B00] bg-[#FFFFFF] rounded-lg shadow-md">
                    <img src={gala} alt="addnew" />
                    <p className='mt-2'>Add New</p>
                </div>
            </div>
        </div>

    );
};

export default ShowTopBrand;
