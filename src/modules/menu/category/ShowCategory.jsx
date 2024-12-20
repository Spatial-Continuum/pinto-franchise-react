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
        <div className="">
            <div className='flex ml-5 justify-between'>
            <h2 className='text-lg font-semibold'>Category</h2>
            <p className='mr-96'>view all</p>
            </div>
            <div className="flex flex-row  gap-5 ">
                {categories.map((category) => (
                    <div className="w-36 h-36 flex flex-col items-center justify-center border-[#EDEDED] bg-[#FFFFFF]" key={category.id} >
                        <div className="w-24 h-24 flex flex-wrap  items-center ">
                            <img
                                src={category.image}
                                alt={category.category_title}

                            />
                        </div>
                        <div className="items-center">
                            <h5 className="text-sm">{category.category_title}</h5>
                        </div>
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

export default ShowCategory;
