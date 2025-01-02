import React, {useState} from 'react';

import { useLocation,useNavigate } from 'react-router-dom'; 
import axios from 'axios'
import ShowFlexElements from "../../../../GeneralComponent/FlexElement/ShowFlexElement.jsx"
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout.jsx';
import { 
    Menu as MenuIcon,
    Search,
    Upload
  } from 'lucide-react'; 
 


function ShowCuisine(){  
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [cuisines, setCategories] = useState(location?.state?.cuisines|| []) 
    const [categoryName, setCuisineName]=useState('') 
    const [singleCuisine,setSinlgeCuisine] = useState({})
     const [showModal,setShowModal] =useState(false) 
     const [newitem, setNewItem] =useState("") 
       const [newimage,setNewImage] =useState(null) 
       const [newImagePreview,setNewImagePreview]  =useState(null) 
       const [searchTerm, setSearchTerm] = useState(""); // Input value
  console.log("lkasjfdjlfsa",singleCuisine)
     const handleSubcategory=(singleCat,categories) =>{ 
        setCuisineName(singleCat.cuisine_title) 
      setSinlgeCuisine(singleCat)
   
     }
     const handleCancel =() =>{ 
        setNewItem('')
        setNewImage(null) 
        setNewImagePreview(null)
        setShowModal(false)
      } 
      const handleSubmitModal=(e) =>{  
        console.log("7777777",singleCuisine) 
        if(newitem&&newimage ){ 
          e.preventDefault();
          const formData = new FormData(); 
            let url_link = Object.keys(singleCuisine).length  ? `${API_URL}/menu/cuisine/`  :  `${API_URL}/menu/cuisine` 
            let type = Object.keys(singleCuisine).length ? 'put' : 'post' 
            formData.append('cuisine_title', newitem); 
          if(newimage){formData.append('image', newimage)} 
              
                if (!url_link) {
                
                  return; 
                }
                axios[type](url_link, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(function (response) { 
            const data = response.data.data 
            console.log("jsdjflasl",response.data.data) 
           
            setNewItem("")
            setNewImage(null)
            setNewImagePreview(null)  
            singleCategory={}
            console.log("true event")
          })
          .catch(function (error) { 
            console.log("error one")
            console.log(error);
          });
        }
       
    
    
      }
    return(
    
         
         <MainLayout 
         headerName={"Back"}
         headerClick = { ()=>navigate("/menu/manage-screen" , { state: { categories } })}
         >

<div className="p-6">
         
         
         <div>   
             <div className="relative mb-8"> 
             <h2 className="text-lg font-semibold">Cuisine</h2> 
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
              onClick={() =>setShowModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Add new  cuisine
            </button>
          </div>
           
         </div>
            <div className="mb-8">
          
           <div className="flex flex-wrap gap-5">
             {cuisines.map((cuisine) => (
              <ShowFlexElements 
              category={cuisine}  
              bottomName={true}
              edit={true} 
              title={cuisine.cuisine_title}
              onEdit={()=>{handleSubcategory(cuisine,cuisines)}} />
             ))}
           </div >   

           
       
           
         
           

         </div> 
           </div>
       

       </div> 

       {showModal&& 
            (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-96">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Cuisine</h2>
                    <button  onClick={()=>{handleCancel()}}>&times;</button>
                  </div>
      
                  {/* Cuisine Title Input */}
                  <div className="mb-4">
                    <label className="block mb-1">Enter Cuisine title</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      placeholder= {`Cuisine title`}
                      value={newitem}
                      onChange={(e) => setNewItem(e.target.value)}
                    />
                  </div>
                 
                  {/* Image Upload */} 
                 
                  
                    <label className="block mb-1">Add image</label> 
                    <div className="mb-4 w-[50%] border border-gray-300 rounded-lg p-8 w-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50" onClick={()=>{document.getElementById('new item image').click()}}> 
                   
                    <input
                      id="new item image"
                      type="file"
                      name="new item image"
                      accept="image/png, image/jpeg"
                      onChange={(e)=>{console.log("listed listed name",e.target),setNewImage(e.target.files[0]),setNewImagePreview(URL.createObjectURL(e.target.files[0]))}}
                      style={{ display: "none" }}
                    />
                    {console.log("newluasifoalsdfjasld",newImagePreview)}
                    {
        !newimage ? <Upload className="w-8 h-8 text-gray-400" /> :""
      }
     
                      {newImagePreview||newimage ? (
                         <img
                         src={newImagePreview}
                         alt="Preview"
                         className="w-32 h-32 object-fit rounded-lg mb-2"
                       />
                      ) : (
                        <div>
                         
                        <span className="text-gray-500">Choose image</span> 
                        
                        </div>
                      )}
                    
                    
                  </div>
      
                  {/* Buttons */}
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={()=>{handleCancel()}}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={(e) => {
                        console.log("asdfasdfasdd")
                        console.log("Image:", newimage); 
                        handleSubmitModal(e)
                      
                       
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      DONE
                    </button>
                  </div>
                </div>
              </div>
            )
        }
         </MainLayout>
         
   
    )
  

}
export default ShowCuisine;
