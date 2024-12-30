import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';  
import { useNavigate } from 'react-router-dom'; 
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx"
import {selectCuisine,fetchCuisineApi,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"
import Editpencil from "../../../../../assets/images/Vector.svg"
import Spot from "../../../../../assets/images/spotlightbanner.svg"
function Cuisine(){ 
         const navigate = useNavigate(); 
        const dispatch = useDispatch();
        const cuisines = useSelector(selectCuisine);  
        console.log("sfdfasdfsad",cuisines)
         useEffect(() => { 
            console.log('Dispatching fetchQuickFilterApi');
            dispatch(fetchCuisineApi());
          }, [dispatch]);
    return(

        <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
        
          <h2 className="text-lg font-semibold">Cuisine</h2>
          <button className="text-orange-500 text-sm" onClick={()=>{console.log("manage manage home7788");navigate("/menu/home-screen/show-cuisine" , { state: { cuisine } });}} >View all</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {cuisines.map((cusine) => (  
             <CategoryCard image={cusine.image} style="w-32 h-32 mb-3"
             imagestyle="w-32 h-32 border rounded-lg" bottomtitle={cusine.name} />

            
          ))}
        <CategoryCard style="w-32 h-32 hover:border-orange-500 " add={true}  isAdd={true}  />
        </div>
      </div> 

    )
}
export default Cuisine;
