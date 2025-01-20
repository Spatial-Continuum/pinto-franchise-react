import React,{useState,useEffect,createContext} from "react";
import { useDispatch, useSelector } from 'react-redux';  
import { useNavigate } from 'react-router-dom'; 
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx"
import {selectCuisine,fetchCuisineApi,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"

export const UpdateContext = createContext();
function Cuisine(){  
         
         const navigate = useNavigate(); 
        const dispatch = useDispatch();
        const cuisines = useSelector(selectCuisine);  
        console.log("sfdfasdfsad",cuisines) 
        const [updateone,setUpdateOne] = useState(false)
         useEffect(() => {
            console.log('Dispatching fetchQuickFilterApi');
            dispatch(fetchCuisineApi());
          }, [dispatch,updateone]); 
         
       const handleUpdate=(value)=>{
        setUpdateOne(value)
       }  
         
    return(
      
        <div className="mb-8">
         
        <div className="flex justify-between items-center mb-4">
        
          <h2 className="text-lg font-semibold">Cuisine</h2>
          <button className="text-orange-500 text-sm" onClick={()=>{console.log("manage manage home7788");navigate("/menu/manage-screen/show-subcuisine" , { state: { cuisines } });}} >View all</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {cuisines?.slice(0, cuisines.length > 4 ? 4 : cuisines.length).map((cusine) => (  
             <CategoryCard key={cusine.cuisine_id} image={cusine.image} style="w-32 h-32 mb-3"
             imagestyle="w-32 h-32 border rounded-lg" bottomtitle={cusine.cuisine_title} />

            
          ))}
        <CategoryCard style="w-32 h-32 hover:border-orange-500 " add={true}  isAdd={true}  
        onEdit={()=>{navigate("/menu/manage-screen/show-subcuisine" , { state: { cuisines,showModal:true} });}} />
        
        </div>
      </div> 
     
    )
}
export default Cuisine;
