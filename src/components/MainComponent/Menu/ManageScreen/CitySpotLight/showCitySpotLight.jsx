import React, {useState} from 'react';

import axios from 'axios'
import { useLocation } from 'react-router-dom'; 
import { useEffect } from 'react';

import ShowFlexElements from '../../../../GeneralComponent/FlexElement/ShowFlexElement.jsx';
import CategoryCard from '../../../../GeneralComponent/FlexElement/CategoryCard.jsx';
import { useNavigate } from 'react-router-dom';  
import Spot from"../../../../../assets/images/spotlightbanner.svg"  
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout.jsx';
import { 
    Menu as MenuIcon,
    Search,
    PlusCircle,
    Home,
    ShoppingCart,
    Store,
    Truck,
    Settings,
    BarChart2,
    MessageSquare,
    HelpCircle,
    Bell,
    PenSquare,
    Upload,
    ChevronLeft
  } from 'lucide-react'; 
  function ShowSpotLight(){ 
    const location = useLocation();
    const [citySpots, setCitySopts] = useState(location?.state?.citySpots|| []) 
    const [categoryName, setCategoryName]=useState('') 
    const [singleCategory,setSingleCategory] = useState('')
    const navigate = useNavigate();
    const handleSubcategory =(singlecity,categories) =>{ 
      setCategoryName(singlecity?.cityspotlight_id) 
      setSingleCategory(singlecity)
   
     }
    return( 
        <MainLayout 
         headerName={"Back"}
         headerClick = { ()=>navigate("/menu/manage-screen" , { state: { citySpots} })}
         >
          <div className="p-6">
         
        
         <div>   
             <div className="relative mb-8"> 
            
             <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-semibold">City spotlight</h2> 
             <button 
               onClick={()=>{navigate("/menu/home-screen/add-filter-form" , { state: { citySpots } });}}
               className="px-4 py-2 border border-blue-500 rounded-lg text-blue-600"
             >
               
              Contact Support
             </button>
           </div> 
          
           
         </div>
            <div className="mb-8">
           
           <div className="flex flex-wrap gap-5">
             {citySpots.map((citySpot) => (
              
              <CategoryCard image={Spot} key ={citySpot.cityspotlight_id}  style="w-54 h-48"
              imagestyle="w-54 h-48 p-2 border rounded-lg" 
              setSub={()=>handleSubcategory(citySpot,citySpots)}
              />
             ))}
           </div >   
           
           
           
         
           

         </div>  
         <div className="mb-8"> 
         <div className="flex justify-between mb-8">
         <h2 className="text-lg font-semibold">Customize Items</h2>  
             <p >Edit</p>
             </div>
        
         <div className="border rounded-lg p-4"> 
            
            <p className="mt-4">Add Sub Category</p>
              <div>  
                  <input
                    type="text"
                    placeholder="Search here"
                    className="border border-gray-300 rounded-lg px-2 mt-2 py-1 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                   <Search className="w-5 h-5  absolute left-3 top-100 text-gray-400" />

                </div> 
                <p className="mt-4">Items in the Spotlight</p> 
                {categoryName && (
                  <div className="my-8">   
                    <div className="border border-gray-200 rounded-lg">  
                      <div className="flex flex-wrap gap-4 m-4"> 
                        {singleCategory?.subcategory_detail && (
                          <ShowFlexElements 
                            category={singleCategory?.subcategory_detail}  
                            title={singleCategory?.subcategory_detail?.subcategory_title}
                            topName={true} 
                            style="w-36 h-30"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

            
        
         </div>

         </div>
           </div>
       
 
       </div>
        </MainLayout>



    )

  } 
  export default ShowSpotLight;