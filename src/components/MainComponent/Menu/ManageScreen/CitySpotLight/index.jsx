import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx"
import {selectCitySpotData,fetchCitySpotApi,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"
import Editpencil from "../../../../../assets/images/Vector.svg"
import Spot from "../../../../../assets/images/spotlightbanner.svg"
function CitySpotLight(){
        const dispatch = useDispatch();
        const filters = useSelector(selectCitySpotData);  

         useEffect(() => { 
            console.log('Dispatching fetchQuickFilterApi');
            dispatch(fetchCitySpotApi());
          }, [dispatch]);
    return(

        <div className="mb-8"> 
        
        <div className="flex justify-between items-center mb-4">
        
          <h2 className="text-lg font-semibold">City Spotlight</h2>
          <button className="text-orange-500 text-sm" onClick={()=>{console.log("manage manage home");navigate("/menu/home-screen/show-spot-light" , { state: {filters } });}} >View all</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {filters?.length>1 && (  
             <CategoryCard image={Spot} style="w-54 h-48"
             key = {filters[0].cityspotlight_id}
             imagestyle="w-54 h-48 p-2 border rounded-lg" />

            
          )}
        <CategoryCard style="w-48 h-48 hover:border-orange-500 " isAdd={true} editImage={Editpencil} editName="customize" imagestyle="w-30 h-30 mb-2" />
        </div>
      </div> 

    )
}
export default CitySpotLight;
