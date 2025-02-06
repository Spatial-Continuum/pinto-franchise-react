import React,{useEffect,useState} from "react";
import ShowFlexWithoutImage from "../../../../GeneralComponent/FlexElement/ShowFlexWithoutImage.jsx"
import { useDispatch, useSelector } from 'react-redux'; 
import {fetchQuickRestaurantApi,selectQuickRestaurant,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"
import { useLocation,useNavigate } from 'react-router-dom'; 
function QuickFilter(){ 
  
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const restaurants = useSelector(selectQuickRestaurant);
    const loading = useSelector(selectApiLoading);
    const error = useSelector(selectApiError);  
     useEffect(() => { 
        console.log('Dispatching fetchQuickRestaurantApi in the quick filter');
        dispatch(fetchQuickRestaurantApi());
      }, [dispatch]);
    return(
        <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
        
          <h2 className="text-lg font-semibold">Quick filter - Restaurant</h2>
          <button className="text-orange-500 text-sm" onClick={()=>{navigate("/menu/manage-screen/show-quick-restaurant" , { state: { restaurants } });}} >View all</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {restaurants?.slice(0, restaurants.length > 4 ? 4 : restaurants.length).map((restaurant) => (  
            <ShowFlexWithoutImage key={restaurant.quickfilter_id} title={restaurant?.filter_name}  
            // edit={true} 
            onEdit={()=>{navigate("/menu/manage-screen/quick-filter-form" , { state: { restaurants,restaurant } });}}
            setSub={()=>{navigate("/menu/manage-screen/quick-filter-form" , { state: { restaurant,restaurants } });}}
            />

            
          ))}
          <ShowFlexWithoutImage isAdd={true}  
          setSub={()=>{navigate("/menu/manage-screen/quick-filter-form" , { state: { restaurants } });}}
          />
        </div>
      </div>
    )

}
export default QuickFilter;