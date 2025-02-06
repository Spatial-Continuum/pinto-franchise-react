import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';  
import { useNavigate } from 'react-router-dom'; 
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx"
import {selectCitySpotData,fetchCitySpotApi,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"
import Editpencil from "../../../../../assets/images/Vector.svg"
import Spot from "../../../../../assets/images/spotlightbanner.svg"
function CitySpotLight(){ 
         const navigate = useNavigate(); 
        const dispatch = useDispatch();
        const citySpots = useSelector(selectCitySpotData);  
        console.log("sfdfasdfsad",citySpots)
         useEffect(() => { 
            console.log('Dispatching fetchQuickFilterApi');
            dispatch(fetchCitySpotApi());
          }, [dispatch]);
    return(

        <div className="mb-8"> 
        
        <div className="flex justify-between items-center mb-4">
        
          <h2 className="text-lg font-semibold">City Spotlight</h2>
          <button className="text-orange-500 text-sm" onClick={()=>{navigate("/menu/manage-screen/show-city-sopts" , { state: {citySpots } });}} >View all</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {citySpots[0]&&
             (<CategoryCard image={Spot} style="w-54 h-48"
             imagestyle="w-54 h-48 p-2 border rounded-lg" />)

            
          }
        <CategoryCard style="w-48 h-48 hover:border-orange-500 " isAdd={true} editImage={Editpencil} editName="customize" imagestyle="w-30 h-30 mb-2" />
        </div>
      </div> 

    )
}
export default CitySpotLight;
