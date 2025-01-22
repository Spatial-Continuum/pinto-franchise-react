import React, {useState} from 'react';
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'; 
import { useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; 
import Group from "../../../../../assets/images/Group.png" 
import { useNavigate,useLocation } from 'react-router-dom';
import { 
    Menu as MenuIcon,
 
    Upload,
  } from 'lucide-react'; 
  import {fetchQuickRestaurantApi,selectQuickRestaurant,selectApiLoading,selectApiError} from "../../../../../redux/slices/menu.js"
const QuickRestaurantForm = () => {  
  const location = useLocation(); 
  const dispatch = useDispatch();
  const resturants = location?.state?.restaurants || [] 
  const singleRestaurant = location?.state?.restaurant || {}  
  const edit = location?.state.edit || false
  const [formState, setFormState] = useState({
    title: singleRestaurant?.name || "",
    image: singleRestaurant?.image || null,
    dropdownOpen: false,
    imagePreview: singleRestaurant?.image || null, 
  }); 
 
  const qrestaurants = useSelector(selectQuickRestaurant);
  const [selectedCuisineIds, setSelectedCuisineIds] = useState([]); 
  const [allCategory,setAllCategory] = useState([]) 
  
  const [cuisines, setCuisines] = useState(singleRestaurant?.cuisines
    ?.map(sub=>({id:sub.cuisine_id,title:sub.cuisine_title}))||[]);   
  const [showModal, setShowModal] = useState(false); 
  const [type,SetType] = useState('')
  const [newitem, setNewItem] =useState("") 
  const [newimage,setNewImage] =useState(null) 
  const [newImagePreview,setNewImagePreview]  =useState(null) 
  const [searchTerm, setSearchTerm] = useState(""); // Input value
  const [restaurants, setRestaurant] = useState([]); // API results
  const [selectedRestaurant, setSelectedRestaurant] = useState(singleRestaurant?.
    subcategories? singleRestaurant?.
    subcategories : []); // Selected item
  const [loading, setLoading] = useState(false); // Loading state for API
  const [hasUpdated, setHasUpdated] = useState(false);
  let debounceTimeout;




  const navigate = useNavigate();
  const toggleDropdown = () => setFormState((prev) => {
     console.log("priced priced",prev) 
     
   return {...prev,dropdownOpen:!prev.dropdownOpen}
  }); 


  
  
  const handleSubmitModal=(type,e) =>{  
    if(newitem&&newimage ){ 
      e.preventDefault();
      const formData = new FormData(); 
      if(type == "Cuisine"){
        formData.append('cuisine_title', newitem); 
      }else if (type == "SubCategory"){
        formData.append('subcategory_title', newitem); 
      }
    
    
      if(newimage){formData.append('image', newimage)} 
            let url_link = (type == "Cuisine") ? `${API_URL}/menu/cuisine`  : (type == "SubCategory")? `${API_URL}/menu/subcategory` : ''
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
        if(type == 'Cuisine'){
            setCuisines((prevCuisines) => [
                ...prevCuisines,
                { cuisine_id: data.cuisine_id, title: data.cuisine_title, value: true },
              ]);
        }
        console.log(response);  
        setNewItem("")
        setNewImage(null)
        setNewImagePreview(null)  
        SetType('')  
        singleRestaurant={}
        console.log("true event")
      })
      .catch(function (error) { 
        console.log("error one")
        console.log(error);
      });
    }
   


  }
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('index', index);
  };
  const handleCancel =() =>{ 
    setNewItem('')
    setNewImage(null) 
    setNewImagePreview(null)
    SetType('')
    setShowModal(false)
  }
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    const sourceIndex = event.dataTransfer.getData('index');
    const updatedData = [...selectedRestaurant];
    [updatedData[sourceIndex], updatedData[targetIndex]] = [updatedData[targetIndex], updatedData[sourceIndex]];
    setSelectedRestaurant(updatedData);
  };
   
    
    const handleSubmit=(e)=>{   
      console.log("sadfsdsds",selectedCuisineIds)
      e.preventDefault();
      const formData = new FormData(); 
      const restaurant_ids = selectedRestaurant.map(items=>items.restaurant_id) 
      
      formData.append('filter_name', formState.title); 
      // restaurant_ids.forEach(id => formData.append('restaurant_ids', id));
      formData.append('restaurant_id', restaurant_ids);
      // if(formState.image){formData.append('image', formState.image)}

       let type = 'post'
       let api = `${API_URL}/restaurant/menu/quickfilterrestaurant`
        if (singleRestaurant && edit){
          type = 'put' 
          api = `${API_URL}/menu/category/${singleRestaurant?.category_id}`
        }
        axios[type](api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response);  
        setFormState({
          title: "",
          dropdownOpen: false,
          imagePreview: null,
        }); 
        setSelectedRestaurant([]) 
        getInfo()
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
      // Handle image selection 
      const handleCacel = ()=>{
        setFormState({
          title: "",
          subCategory: "",
          selectedCuisines: [],
          dropdownOpen: false,
          imagePreview: null,
        }); 
        setSelectedCuisineIds([])
        setSelectedRestaurant([])
      }
  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    console.log("lllllll",file)
    if (file) { 
      setFormState((prev) => ({ ...prev,image:file, imagePreview:URL.createObjectURL(file)

      }))
      
     
    }
  }; 
  const handleRemoveItem = (index) => {
    const updatedData = [...selectedRestaurant];
    updatedData.splice(index, 1);
    setSelectedRestaurant(updatedData);
  };
  const handleCheckboxChange = (e,value) => { 
    console.log("uuuuu223423423",e,value) 
    const isChecked = e.target.checked 
    console.log("asdfasdfasdfas",isChecked) 
    const updatedCuisine = formState.allcuisine.map(items=>{
      if(items.cuisine_id === value.cuisine_id)
        { return{...items,value:isChecked}}
      else{return {...items}}}) 
      console.log("asdkflkasdjfds",updatedCuisine)
  
     setFormState(items=>({...items,allcuisine:updatedCuisine}))
  
  };
  // Remove the selected image
  const handleRemoveImage = () => {
    setFormState((prev)=>({...prev,image:null,imagePreview:''}))
  }; 
  console.log("dddddd4444",selectedCuisineIds) 
  const getInfo = () =>{
   
   dispatch(fetchQuickRestaurantApi());
  } 
  
  
 
  useEffect(() => {
    if (formState?.allcuisine?.length > 0 && singleRestaurant?.cuisines && !hasUpdated) {
      updateCuisines();
      setHasUpdated(true);  // Prevent further updates
    }
  }, [singleRestaurant,formState?.allcuisine]); // Ensure this logic runs when dependencies change
  console.log("asdfasdf222",formState)
  useEffect(()=>{
   
    getInfo() 
   
    
  },[])  


  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
        console.log("sadfadfasd",value)
    // Clear the previous timeout
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Set a new timeout to trigger the API call after 500ms
    debounceTimeout = setTimeout(() => {
      fetchSubCategories(value);
    }, 500);
  };
  const fetchSubCategories = async (query) => { 
    console.log("new creat3de tine",query)
    if (!query) {
      setRestaurant([]); 
      return;
    }

    setLoading(true);
    try { 
    
      const response = await fetch(
        `${API_URL}/restaurant/merchant/search?name=${query}`
      );
      const data = await response.json(); 
      console.log("sadfasd",data)
      setRestaurant(data || []); 
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = (item) => {
    setSelectedRestaurant(previtem=>[...previtem,item]);
    setSearchTerm(''); 
    setRestaurant([]); 
  };


  console.log("API_URL3322",formState)
    return (  
      <MainLayout headerName={"Edit"} headerClick={() => {
        navigate("/menu/manage-screen/show-quick-restaurant", { state: { restaurants:qrestaurants } });
      }}>

<div className='m-6'> 
              <h2 className="text-lg font-semibold"> Add Quick filter-Restaurant</h2> 
              <form onSubmit={handleSubmit}>
             <div className="p-6 border rounded-lg m-2">
        <div className="flex ">
        <div className="mb-6">
          <label className="block text-sm mb-2">Add filter title</label>
          <input 
             id ="title"
            type="text" 
            placeholder="Type here.." 
            className="border border-gray-300 rounded-lg px-3 py-2 w-54" 
            value= {formState.title}
             onChange={(e)=> setFormState((prevState) => ({ ...prevState, title: e.target.value }))
            }
          />
        </div>
  
        <div className="mb-6 ml-8 relative ">
          <label className="block text-sm mb-2">Add restsurant</label>
          <input 
            type="text" 
            placeholder="Enter to add" 
            className="border border-gray-300 rounded-lg px-3 py-2 w-56" 
            value={searchTerm}
            onChange={handleInputChange}
          
          />  
              {/* Dropdown */}
              {loading && <p className="text-gray-400 mt-2">Loading...</p>} 
            {restaurants.length > 0 && (
        <ul className="absolute z-2 top-full border rounded mt-2 shadow-md max-h-48 overflow-auto">
          {restaurants.map((item) => (
            <li
              key={item.restaurant_id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              {item.name
              }
            </li>
          ))}
        
          <li className="p-2 text-blue-500 cursor-pointer" onClick={()=>{SetType("SubCategory"),setShowModal(true)}}>
            Add new Restaurant
          </li>
        </ul>
      )}
          
        </div> 
       
           
        </div>
       
  
       
  
        <div>
          <label className="block text-sm mt-6 mb-4">Selected Restaurant</label>
         
         

           <div className="grid grid-cols-4 gap-4">
            {console.log("lonmg timedi",selectedRestaurant)}
          { selectedRestaurant?.map((item, index) => (
        <div
          key={item?.restaurant_id}
          
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
        >  
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="ml-2"><img src={Group} /></span>
            <span className="ml-2">{item?.name}</span>
            <span className="ml-2" onClick={()=>handleRemoveItem(index)}>x</span>
        </div>
          <img src={item?.image} alt={item?.name} className="border w-44 h-40"/>
          
        </div>
      ))}
    </div>
        </div> 
        <div className="flex flex-row items-end space-x-4 m-8">

  
  <button type="submit"  className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>Add Quick Filter</button> 
  <button type="reset" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" onClick={handleCacel}>Cancel</button>
</div>
      </div> 
      </form>
        </div>  
        {showModal&& 
            (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-96">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New {type}</h2>
                    <button  onClick={()=>{handleCancel()}}>&times;</button>
                  </div>
      
                  {/* Cuisine Title Input */}
                  <div className="mb-4">
                    <label className="block mb-1">Enter {type} title</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      placeholder= {`${type} title`}
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
                        handleSubmitModal(type,e)
                      
                       
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
    );
  }; 
export default QuickRestaurantForm;