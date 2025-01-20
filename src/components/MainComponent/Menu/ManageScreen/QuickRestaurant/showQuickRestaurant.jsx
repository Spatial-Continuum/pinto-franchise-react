import React, {useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom'; 
import ShowFlexElements from '../../../../GeneralComponent/FlexElement/ShowFlexElement.jsx';
import ShowFlexWithoutImage from '../../../../GeneralComponent/FlexElement/ShowFlexWithoutImage.jsx';
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout.jsx'; 
import {fetchQuickRestaurantApi} from "../../../../../redux/slices/menu.js"
import { 
    Menu as MenuIcon,
    Search,
  } from 'lucide-react'; 
import { useDispatch } from 'react-redux';
  function ShowQuickRestaurant(){ 
    const dispatch  =useDispatch();
    const location = useLocation(); 
        const navigate = useNavigate(); 
        const [restaurants, setrestaurants] = useState(location?.state?.restaurants|| []) 
    console.log("restaurants_restaurants",restaurants)
    const [categoryname, setCategoryName] =useState('')
    useEffect(() => { 
            console.log('Dispatching fetchQuickRestaurantApi in the quick filter');
            dispatch(fetchQuickRestaurantApi());
          }, [dispatch]);
    return(
        <MainLayout 
        headerName={"Back"}
        headerClick = { ()=>navigate("/menu/manage-screen" , { state: { restaurants } })}
        >
         <div className="p-6">
         
        
          <div>   
              <div className="relative mb-8"> 
              <h2 className="text-lg font-semibold">Quick Restaurant</h2> 
              <div className="flex justify-between items-center mb-4">
                <div>  
                <input
              type="text"
              placeholder="Search here"
              className="border border-gray-300 rounded-lg px-2 mt-2 py-1 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
           <Search className="w-5 h-5  absolute left-3 top-11 text-gray-400" />

                    </div>
              <button 
                onClick={()=>{navigate("/menu/manage-screen/quick-restaurant-form" , { state: { restaurants } });}}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add New Restaurant
              </button>
            </div>
            
          </div>
             <div className="mb-8">
            
            <div className="flex flex-wrap gap-5">
              {restaurants.map((restaurant) => (
               <ShowFlexWithoutImage 
               key ={restaurant.quickfilter_id}
               title={restaurant.filter_name}  
               setSub={()=>setCategoryName(restaurant.filter_name)} 
               onEdit={()=>{navigate("/menu/manage-screen/quick-restaurant-form" , { state: { restaurants,restaurant } });}}
               edit = {true}
                />
              ))}
            </div >   
            {console.log("asdfasfss",categoryname)}
            {
                categoryname? 
                <div className="m-8">   
            <h2 className="text-lg font-semibold">Sub Categories in {categoryname}</h2>  
               <div className="border border-gray-200 rounded-lg">  
                <div className="flex flex-wrap gap-4  m-4"> 
                    {console.log("888sdfsdg",restaurants.filter((restaurant)=>(restaurant.filter_name == categoryname))?.map((restaurant) => restaurant.resturants))?.flat()}
                {restaurants?.filter((restaurant)=>(restaurant.filter_name == categoryname))?.map((restaurant) => restaurant.restaurants)?.flat()?.map((restaurant) => {
                  console.log("restaurant restaurant", restaurant)
               return (<ShowFlexElements 
               category={restaurant}  
               topName={true}  
               style={"w-36 h-30"} 
               title= {restaurant.name}
               />
              )})}  
                   </div>
               
                </div>
              </div>
                : ''
            }
            
          </div> 
            </div>
        
  
        </div>
        </MainLayout>
    )
}
export default ShowQuickRestaurant;