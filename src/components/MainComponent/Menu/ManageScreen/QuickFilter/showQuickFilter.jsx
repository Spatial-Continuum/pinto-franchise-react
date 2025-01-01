import React, {useState} from 'react';

import { useLocation,useNavigate } from 'react-router-dom'; 
import ShowFlexElements from '../../../../GeneralComponent/FlexElement/ShowFlexElement.jsx';
import ShowFlexWithoutImage from '../../../../GeneralComponent/FlexElement/ShowFlexWithoutImage.jsx';
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout.jsx';
import { 
    Menu as MenuIcon,
    Search,
  } from 'lucide-react'; 
  function ShowFilter(){ 

    const location = useLocation(); 
        const navigate = useNavigate(); 
        const [filters, setFilters] = useState(location?.state?.filters|| []) 
    console.log("filters_filters",filters)
    const [categoryname, setCategoryName] =useState('')
 
    return(
        <MainLayout 
        headerName={"Back"}
        headerClick = { ()=>navigate("/menu/manage-screen" , { state: { filters } })}
        >
         <div className="p-6">
         
        
          <div>   
              <div className="relative mb-8"> 
              <h2 className="text-lg font-semibold">Quick Filter</h2> 
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
                onClick={()=>{navigate("/menu/manage-screen/quick-filter-form" , { state: { filters } });}}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add New Filter
              </button>
            </div>
            
          </div>
             <div className="mb-8">
            
            <div className="flex flex-wrap gap-5">
              {filters.map((filter) => (
               <ShowFlexWithoutImage 
               key ={filter.quickfilter_id}
               title={filter.filter_title}  
               setSub={()=>setCategoryName(filter.filter_title)} 
               onEdit={()=>{navigate("/menu/manage-screen/quick-filter-form" , { state: { filters,filter } });}}
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
                    {console.log("888sdfsdg",filters.filter((filter)=>(filter.filter_title == categoryname))?.map((filter) => filter.subcategories))?.flat()}
                {filters?.filter((filter)=>(filter.filter_title == categoryname))?.map((filter) => filter.subcategories)?.flat()?.map((subcategory) => (
               <ShowFlexElements 
               category={subcategory}  
               topName={true}  
               style={"w-36 h-30"}
               />
              ))}  
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
export default ShowFilter;