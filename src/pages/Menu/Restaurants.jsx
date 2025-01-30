import React from 'react'
import RestaurantList from '../../modules/restaurants/RestaurantList'
import search from '../../assets/images/prime_search.svg';
import NewRestaurants from '../../modules/restaurants/NewRestaurants'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
import PropsSearchBox from '../../components/GeneralComponent/SearchBox/PropsSearchBox'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import MainLayout from '../../components/GeneralComponent/Layout/MainLayout'
import SearchBox from '../../components/GeneralComponent/SearchBox/SearchBox'
const Restaurants = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const handleAddItemClick = () => {
    navigate('/menu/restaurant-item/addmenu')
  }

  const handleSearch =(term)=>{
    setSearchTerm(term);
  }
  return (
    <div>
      <MainLayout headerName="Restaurant Menu" className="bg-[#F8F8F8]">
        <div>
        <div className='flex justify-between   mt-5'>
          <SearchBox placeholder="Search Restaurant name" img={search} onSearch={handleSearch}  />
          <button className='bg-orange-500 text-xs text-white rounded-md pl-7 pr-3 py-2'
            >+  ADD ITEM</button>
        </div>
        <div>
          <NewRestaurants searchTerm={searchTerm}/>
        </div>
        <div>
          <RestaurantList searchTerm={searchTerm} />
        </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default Restaurants
