
import React from "react";
import { useState } from "react";
import SubcategoryPopup from "./SubcategoryPopup";
const M_lovedDishes = () => {
  const [subcategoryModal , setSubcategoryModal] = useState(false)
  const dishes = [
    {
      image: "https://via.placeholder.com/100",
      name: "Spaghetti Bolognese",
      quantity: "2",
      cuisine: "Italian",
      items: "5",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Chicken Curry",
      quantity: "3",
      cuisine: "Indian",
      items: "6",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Sushi Platter",
      quantity: "1",
      cuisine: "Japanese",
      items: "4",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Tacos",
      quantity: "4",
      cuisine: "Mexican",
      items: "8",
    },
    {
        image: "https://via.placeholder.com/100",
        name: "Chicken Curry",
        quantity: "3",
        cuisine: "Indian",
        items: "6",
      },
      {
        image: "https://via.placeholder.com/100",
        name: "Sushi Platter",
        quantity: "1",
        cuisine: "Japanese",
        items: "4",
      },
      {
        image: "https://via.placeholder.com/100",
        name: "Tacos",
        quantity: "4",
        cuisine: "Mexican",
        items: "8",
      },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Most Loved Dishes</h2>
         <button className='bg-orange-500  text-white  px-4 py-2 rounded-lg font-medium'
         onClick={()=>setSubcategoryModal(true)}
         >+NEW DISH</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white flex flex-col justify-between"
          >
            {/* Top Section: Image and Details */}
            <div className="flex">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{dish.name}</h3>
                <p className="text-gray-700 text-sm">Quantity: {dish.quantity}</p>
              </div>
            </div>

            {/* Bottom Section: Cuisine and Items */}
            <div className="flex justify-between mt-4 text-sm font-medium text-orange-500">
              <p>Cuisine: {dish.cuisine}</p>
              <p>Items: {dish.items}</p>
            </div>
          </div>
        ))}
      </div>

      {subcategoryModal && 
      <div>
        <SubcategoryPopup onClose={()=>setSubcategoryModal(false)}/>
        </div>}
    </div>
  );
};

export default M_lovedDishes;
