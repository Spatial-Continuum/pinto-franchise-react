import React,{useEffect,useState} from "react";
import ShowFlexWithoutImage from "../../../../GeneralComponent/FlexElement/ShowFlexWithoutImage.jsx"
import { useDispatch, useSelector } from 'react-redux'; 
import {fetchQuickFilterApi,selectQuickFilterApiData,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"
import { useLocation,useNavigate } from 'react-router-dom'; 
function QuickFilter(){ 
  
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const filters = useSelector(selectQuickFilterApiData);
    const loading = useSelector(selectApiLoading);
    const error = useSelector(selectApiError);  
     useEffect(() => { 
        console.log('Dispatching fetchQuickFilterApi in the quick filter');
        dispatch(fetchQuickFilterApi());
      }, [dispatch]);
    return(
        <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
        
          <h2 className="text-lg font-semibold">Quick filter - Menu</h2>
          <button className="text-orange-500 text-sm" onClick={()=>{navigate("/menu/manage-screen/show-quick-filter" , { state: { filters } });}} >View all</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {filters?.slice(0, filters.length > 4 ? 4 : filters.length).map((filter) => (  
            <ShowFlexWithoutImage key={filter.quickfilter_id} title={filter.filter_title}  
            // edit={true} 
            onEdit={()=>{navigate("/menu/manage-screen/quick-filter-form" , { state: { filters,filter } });}}
            setSub={()=>{navigate("/menu/manage-screen/quick-filter-form" , { state: { filter,filters } });}}
            />

            
          ))}
          <ShowFlexWithoutImage isAdd={true}  
          setSub={()=>{navigate("/menu/manage-screen/quick-filter-form" , { state: { filters } });}}
          />
        </div>
      </div>
    )

}
export default QuickFilter;