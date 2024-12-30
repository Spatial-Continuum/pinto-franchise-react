import React, {useState} from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom'; 
import { useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; 
import { useNavigate } from 'react-router-dom';  
import Group from "../../../../../assets/images/Group.png" 
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout.jsx';
 
const AddFilterForm = () => {  
  const location = useLocation(); 
  const filters = location?.state?.filters || [] 
  const singleFilter = location?.state?.filter || {}
  const [filterName,setFilterName]  = useState(singleFilter?.filter_title || '')
 const [searchTerm, setSearchTerm] = useState("");
 const [subCategories, setSubCategories] = useState([]);
 const [loading, setLoading] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState(singleFilter?.
     subcategories? singleFilter?.
     subcategories : []);
 let debounceTimeout;
  
    console.log("namely namely",singleFilter)
    const handleRemoveItem = (index) => {
        const updatedData = [...selectedCategory];
        updatedData.splice(index, 1);
        setSelectedCategory(updatedData);
      };
  
    const navigate = useNavigate(); 
    const handleDragStart = (event, index) => {
      event.dataTransfer.setData('index', index);
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
    const handleSelect = (item) => {
        setSelectedCategory(previtem=>[...previtem,item]);
        setSearchTerm(''); 
        setSubCategories([]); 
      };
      const handleDrop = (event, targetIndex) => {
        event.preventDefault();
        const sourceIndex = event.dataTransfer.getData('index');
        const updatedData = [...selectedCategory];
        [updatedData[sourceIndex], updatedData[targetIndex]] = [updatedData[targetIndex], updatedData[sourceIndex]];
        setSelectedCategory(updatedData);
      };
 
    const fetchSubCategories = async (query) => { 
        console.log("new creat3de tine",query)
        if (!query) {
          setSubCategories([]); // Clear results if input is empty
          return;
        }
    
        setLoading(true);
        try { 
        
          const response = await fetch(
            `${API_URL}/menu/subcategory/by-name?subcategory_title=${query}`
          );
          const data = await response.json(); 
          console.log("sadfasd",data)
          setSubCategories(data || []); // Assuming results come in `results`
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        } finally {
          setLoading(false);
        }
      };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
        console.log("sadfadfasd",value)
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Set a new timeout to trigger the API call after 500ms
    debounceTimeout = setTimeout(() => {
      fetchSubCategories(value);
    }, 500);
  }; 

  const handleSubmit=(e)=>{   
    
    e.preventDefault();
    const formData = new FormData(); 
    const sub_category_ids = selectedCategory.map(items=>items.subcategory_id) 
   
    formData.append('filter_title', filterName); 
    sub_category_ids.forEach(id => formData.append('subcategory_ids[]', id));
    
     console.log("asdfasdfasda111",sub_category_ids)

     let type = 'post'
     let api = `${API_URL}/menu/quick_filters` 
     console.log("asdfasfasd",singleFilter)
     if(singleFilter?.quickfilter_id){ 
      type = 'put' 
      api = `${API_URL}/menu/quick_filters/${singleFilter?.quickfilter_id}`
    } 
    console.log("asdfasdfasfasd",type)
      axios[type](api, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      console.log(response);  
      setFilterName('')
      setSelectedCategory([])
    })
    .catch(function (error) {
      console.log(error);
    });
  } 
  function handleCancel(){
    setFilterName('')
        setSelectedCategory([])
  }
    return (  
        <MainLayout 
        headerName={"Back"}
        headerClick={() => {
          navigate("/menu/manage-screen/show-quick-filter", { state: { filters } });
        }}
        >
        <div className='m-6'> 
              <h2 className="text-lg font-semibold"> Add New Quick Filter </h2> 
              <form onSubmit={handleSubmit}>
             <div className="p-6 border rounded-lg m-2">
        <div className="flex ">
        <div className="mb-6">
          <label className="block text-sm mb-2">Filter Title</label> 
          
          <input 
             id ="title"
            type="text" 
            placeholder="Biryani" 
            className="border border-gray-300 rounded-lg px-3 py-2 w-54" 
            value = {filterName}
             onChange={(e)=> setFilterName(e.target.value)}
          />
        </div>
  
        <div className="mb-6 ml-8 relative ">
          <label className="block text-sm mb-2">Add sub category</label>
          <input 
            type="text" 
            placeholder="Enter to add" 
            className="border border-gray-300 rounded-lg px-3 py-2 w-56" 
            value={searchTerm}
            onChange={handleInputChange}
          
          />  
              {/* Dropdown */}
              {loading && <p className="text-gray-400 mt-2">Loading...</p>} 
            {subCategories.length > 0 && (
        <ul className="absolute z-10 top-full border rounded mt-2 shadow-md max-h-48 overflow-auto">
          {subCategories.map((item) => (
            <li
              key={item.subcategory_id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              {item.subcategory_title
              }
            </li>
          ))}
        
          <li className="p-2 text-blue-500 cursor-pointer" onClick={()=>{SetType("SubCategory"),setShowModal(true)}}>
            Add new Sub category
          </li>
        </ul>
      )}
          
        </div> 
        </div>
       

  
        <div>
          <label className="block text-sm mb-4">Selected Sub category</label>
          <div className="grid grid-cols-4 gap-4">
          {selectedCategory.map((item,index) => (
        <div
          key={item.subCategories_id}  
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
        >  
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="ml-2"><img src={Group} /></span>
            <span className="ml-2">{item.subcategory_title}</span>
            <span className="ml-2" onClick={()=>handleRemoveItem(index)}>x</span>
        </div>
          <img src={item.image} alt={item.subcategory_title} className="border w-44 h-40"/>
          
        </div>
      ))}
          </div>
        </div> 
        <div className="flex flex-row items-end space-x-4 m-8">

  
  <button type="submit"  className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>ADD QUICK FILTER</button> 
  <button type="reset" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"  onClick={handleCancel}>Cancel</button>
</div>
      </div> 
      </form>
        </div> 
         </MainLayout>
    );
  }; 
export default AddFilterForm;