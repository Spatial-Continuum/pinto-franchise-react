import React,{useState,useEffect} from "react"; 
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx";
import { useDispatch, useSelector } from 'react-redux';
import {fetchSubCategoryApi,selectSubCategory,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"
import { useNavigate } from 'react-router-dom'; 

function SubCategory()
{   

  const dispatch = useDispatch();
  const subcategories = useSelector(selectSubCategory);
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);
  const navigate = useNavigate(); 
  console.log("sadfkjasldfjlasd",subcategories)
  useEffect(() => { 
    console.log('Dispatching fetchSubCategoryApi');
    dispatch(fetchSubCategoryApi());
  }, []);
  return(
    <div className="mb-8 mt-4">
    <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Sub Category</h2>
              <button className="text-orange-500 text-sm" onClick={()=>
                {
                    navigate("/menu/manage-screen/show-subcategory" , { state: { subcategories } });
                }
            } 
                >View all</button>
            </div>
            <div className="flex flex-row gap-5">  
            
              {subcategories?.slice(0, subcategories.length > 4 ? 4 : subcategories.length).map((subcategory) => ( 
                
                <CategoryCard key={subcategory.subcategory_id} {...subcategory} image = {subcategory.image}
                imagestyle={"w-24 h-24  text-center "}
                title= {subcategory.subcategory_title} 
               
              // onEdit={()=>{navigate("/menu/manage-screen/categoty-form" , { state: { subcategories } })}} 
                />
              ))}
              <CategoryCard add={true} isAdd={true} subcategories={subcategories} 
              onEdit={()=>{navigate("/menu/manage-screen/show-subcategory" ,{ state: { subcategories,showModal:true} });}} />
            </div> 
            </div>
  )
}
export default SubCategory;