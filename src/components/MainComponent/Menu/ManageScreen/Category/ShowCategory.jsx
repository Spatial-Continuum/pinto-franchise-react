import React, {useState} from 'react';

import { useLocation,useNavigate } from 'react-router-dom'; 

import ShowFlexElements from "../../../../GeneralComponent/FlexElement/ShowFlexElement.jsx"
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout.jsx';
import { 
    Menu as MenuIcon,
    Search,
  } from 'lucide-react'; 
 


function ShowCategory(){  
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [categories, setCategories] = useState(location?.state?.categories|| []) 
    const [categoryName, setCategoryName]=useState('') 
    const [singleCategory,setSinlgeCategory] = useState({})
  

     const handleSubcategory =(singleCat,categories) =>{ 
      setCategoryName(singleCat.category_title) 
      setSinlgeCategory(singleCat)
   
     }
    
    return(
    
         
         <MainLayout 
         headerName={"Back"}
         headerClick = { ()=>navigate("/menu/manage-screen" , { state: { categories } })}
         >

<div className="p-6">
         
         
         <div>   
             <div className="relative mb-8"> 
             <h2 className="text-lg font-semibold">Category</h2> 
             <div className="flex justify-between items-center">
              <div> 
              <input
             type="text"
             placeholder="Search here"
             className="border border-gray-300 mt-2 rounded-lg px-2 py-1 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300"
           />
          <Search className="w-5 h-5 absolute left-3 top-10 text-gray-400" />
              </div>
            <button 
              onClick={() =>navigate("/menu/manage-screen/categoty-form" , { state: { categories } })}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Add category
            </button>
          </div>
           
         </div>
            <div className="mb-8">
          
           <div className="flex flex-wrap gap-5">
             {categories.map((category) => (
              <ShowFlexElements 
              category={category}  
              bottomName={true}
              edit={true} 
              title={category.category_title}
              setSub={()=>{handleSubcategory(category,categories)}} 
              onEdit={()=>{navigate("/menu/manage-screen/categoty-form" , { state: { category,categories } })}} />
             ))}
           </div >   

           {categoryName? 
                <div className="my-8">   
                <h2 className="text-lg font-semibold">Sub Categories in {categoryName} </h2>  
                   <div className="border border-gray-200 rounded-lg">  
                    <div className="flex flex-wrap gap-4  m-4"> 
                    {singleCategory.subcategories?.map((subcategory) => (
                   <ShowFlexElements 
                   category={subcategory}  
                   title={subcategory.subcategory_title}
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
export default ShowCategory
