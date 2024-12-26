import React, { useEffect, useState } from 'react';
import RestaurantService from '../../restaurants/RestaurantService';
import gala from '../../../assets/images/gala_add.svg';

const ShowCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await RestaurantService.getAllCategories();
                setCategories(data); // Assuming `data` is an array of categories
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="pl-4">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Category</h2>
                <p className="mr-16 text-lg font-normal text-[#FB6B00]">View All</p>
            </div>
            <div className="flex flex-row mt-8 gap-5">
                {categories.slice(0, 5).map((category) => ( 
                    <div
                        className="w-52 h-52 flex flex-col items-center  rounded-md border-[#EDEDED] bg-[#FFFFFF]"
                        key={category.id}
                    >
                        <div className="w-24 h-24 flex flex-wrap mt-5 items-center">
                            <img
                                src={category.image}
                                alt={category.category_title}
                                className="object-fit w-32 h-32"
                            />
                        </div>
                        <div className="items-center mt-12">
                            <h5 className="text-sm">{category.category_title}</h5>
                        </div>
                    </div>
                ))}
                {/* Add the empty div */}
                <div className="w-52 h-52 flex flex-col items-center justify-center border-[1px] rounded-md border-[#FF6B00] bg-[#FFFFFF]">
                    <img src={gala} alt="Add new" />
                    <p className="text-xs mt-2">Add New</p>
                </div>
            </div>
        </div>
    );
};

export default ShowCategory;
