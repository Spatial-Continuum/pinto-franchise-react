import React, {useState} from 'react';

import { useLocation,useNavigate } from 'react-router-dom'; 
import ShowFlexElements from "../../../../GeneralComponent/FlexElement/ShowFlexElement.jsx"
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout.jsx';
import { 
    Menu as MenuIcon,
    Search,
  } from 'lucide-react'; 
 import vector from "../../../../../assets/images/Vector_colorless.png"
 import { 
    Menu as MenuIcon,
    Upload,
  } from 'lucide-react';

function ShowSubCategory(){  
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [subcategories, setSubCategories] = useState(location?.state?.subcategories|| []) 
    const [categoryName, setCategoryName]=useState('') 
    const [singleCategory,setSinlgeCategory] = useState({})
    const [allEdit , setAllEdit] = useState(false)
    const [singleEdit,setSingleEdit] =useState(false) 
      const [newitem, setNewItem] =useState("") 
      const [newimage,setNewImage] =useState(null) 
      const [newImagePreview,setNewImagePreview]  =useState(null) 
      const [searchTerm, setSearchTerm] = useState(""); // Input value
     const handleSubcategory =(singleCat,subcategories) =>{ 
      setCategoryName(singleCat.category_title) 
      setSinlgeCategory(singleCat)
   
     }
     const handleEditSubCatgory= (subcategory) =>{ 
        console.log("akjsdfhkjashasdj;d")
        setSingleEdit(true)
       
     } 
     const handleCancel =() =>{ 
        setNewItem('')
        setNewImage(null) 
        setNewImagePreview(null)
        SetType('')
        setSingleEdit(false)
      } 
      const handleSubmitModal=(e) =>{  
        if(newitem&&newimage ){ 
          e.preventDefault();
          const formData = new FormData(); 
        
            formData.append('subcategory_title', newitem); 
          
        
        
          if(newimage){formData.append('image', newimage)} 
                let url_link = `${API_URL}/menu/subcategory`
                if (!url_link) {
                
                  return; 
                }
                axios.post(url_link, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(function (response) { 
            const data = response.data.data 
            console.log("jsdjflasl",response.data.data) 
           
            console.log(response);  
            setNewItem("")
            setNewImage(null)
            setNewImagePreview(null)  
            SetType('')  
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
         headerClick = { ()=>navigate("/menu/manage-screen" , { state: { subcategories } })}
         >

<div className="p-6">
         
         
         <div>   
             <div className="relative mb-8"> 
             <h2 className="text-lg font-semibold">Sub Category</h2> 
             <div className="flex justify-between items-center">
              <div> 
              <input
             type="text"
             placeholder="Search here"
             className="border border-gray-300 mt-2 rounded-lg px-2 py-1 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300"
           />
          <Search className="w-5 h-5 absolute left-3 top-10 text-gray-400" />
              </div> 
              <div className='flex space-x-4'>
              <button 
              onClick={() =>setAllEdit(true)}
              className="p-2 text-black rounded-lg border border-black flex item-center"
            > 
            <img src={vector} alt="Edit" className="mt-2 mr-2"  />
             Edit
            </button>
            <button 
              onClick={() =>navigate("/menu/manage-screen/categoty-form" , { state: { subcategories } })}
              className=" px-2 bg-green-600 text-white rounded-lg "
            >
              Add category
            </button> 
            </div>
          </div>
           
         </div>
            <div className="mb-8">
          
           <div className="flex flex-wrap gap-5">
             {subcategories.map((subcategory) => (
                <>
                 
              <ShowFlexElements 
              category={subcategory}  
              topName={true}
              topEdit={allEdit?true :''}
              handleEditTop={allEdit? handleEditSubCatgory(subcategory) : ''}
              title={subcategory.subcategory_title}
              setSub={()=>{handleSubcategory(subcategory,subcategories)}} 
              onEdit={()=>{navigate("/menu/manage-screen/categoty-form" , { state: { subcategory,subcategories } })}} />
              </>
             ))}
           </div >          

         </div> 
           </div>
       

       </div> 
          
       {singleEdit&& 
            (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-96">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Sub Category</h2>
                    <button  onClick={()=>{handleCancel()}}>&times;</button>
                  </div>
      
                  {/* Cuisine Title Input */}
                  <div className="mb-4">
                    <label className="block mb-1">Enter Sub Category title</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      placeholder= {`Sub Category title`}
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
export default ShowSubCategory
