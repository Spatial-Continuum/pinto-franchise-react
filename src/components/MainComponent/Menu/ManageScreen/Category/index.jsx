import React,{useState,useEffect} from "react"; 
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard";
import { useDispatch, useSelector } from 'react-redux';
import {fetchCategoryApi,selectCategoryApiData,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"
import { useNavigate } from 'react-router-dom'; 

function Category()
{   
  const [viewall,setViewAll] = useState(false) 
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoryApiData);
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);
  const navigate = useNavigate(); 
  useEffect(() => { 
    console.log('Dispatching fetchCategoryApi');
    dispatch(fetchCategoryApi());
  }, [dispatch]);
  return(
    <div className="mb-8 mt-4">
    <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Category</h2>
              <button className="text-orange-500 text-sm" onClick={()=>{;navigate("/menu/manage-screen/show-category" , { state: { categories } });}} >View all</button>
            </div>
            <div className="flex flex-row gap-5">  
            
              {viewall&&categories?.length>4? categories: categories?.slice(0, 5).map((category) => ( 
                
                <CategoryCard key={category.category_id} {...category}
                imagestyle={"w-24 h-24  text-center "}
                title= {category.category_title} 
               
              onEdit={()=>{navigate("/menu/manage-screen/categoty-form" , { state: { category,categories } })}} 
                />
              ))}
              <CategoryCard add={true} isAdd={true} categories={categories} />
            </div> 
            </div>
  )
}
export default Category;