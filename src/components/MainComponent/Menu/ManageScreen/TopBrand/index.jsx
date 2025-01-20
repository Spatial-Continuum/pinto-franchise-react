import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';  
import { useNavigate } from 'react-router-dom'; 
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx"
import {selectTopBrand,fetchTopBrandApi,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"


function TopBrand(){  
         
         const navigate = useNavigate(); 
        const dispatch = useDispatch();
        const topBrand = useSelector(selectTopBrand);  
        console.log("sfdfasdfsad5433",topBrand) 
      
         useEffect(() => {
            console.log('Dispatching fetchTopBrandApi');
            dispatch(fetchTopBrandApi());
          }, []); 
         
      
         
    return(
      
        <div className="mb-8">
         
        <div className="flex justify-between items-center mb-4">
        
          <h2 className="text-lg font-semibold">Top brands</h2>
          <button className="text-orange-500 text-sm" onClick={()=>{console.log("manage manage home7788");navigate("/menu/manage-screen/show-topbrand" , { state: { topbrands:topBrand } });}} >View all</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {topBrand?.slice(0, topBrand.length > 4 ? 4 : topBrand.length).map((topbrand) => (  
            
             <CategoryCard key={topbrand?.top_restaurant_id} image={topbrand?.restaurant
              .logo} style="w-32 h-32 mb-3"
             imagestyle="w-24 h-24  text-center " bottomtitle={topbrand?.restaurant.
              name} />

            
          ))}
        <CategoryCard style="w-32 h-32 hover:border-orange-500 " add={true}  isAdd={true}  
        onEdit={()=>{navigate("/menu/manage-screen/show-subcuisine" , { state: { topBrand,showModal:true} });}} />
        
        </div>
      </div> 
     
    )
}
export default TopBrand;
