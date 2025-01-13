import React, { useEffect, useState } from 'react'
import MetricsCard from '../../../components/GeneralComponent/MetricsCard/MetricsCard'
import SearchBox from '../../../components/GeneralComponent/SearchBox/SearchBox'
import MainLayout from '../../../components/GeneralComponent/Layout/MainLayout'
import FilterDropdown from '../../../components/GeneralComponent/Dropdown/FilterDropdown'
import RestaurantTable from './RestaurantTable'
import DateBox from '../../../components/GeneralComponent/Dropdown/DateBox'
import { getRestaurantList, selectRestaurantList, getNewRestaurants, selectAllNewRestaurants ,selectApiError,selectApiLoading } from '../../../redux/slices/restaurant'

import { useDispatch, useSelector } from 'react-redux'
const ManageMerchant = () => {
  const [onboarding, setOnboarding] = useState('Success')
  const [searchTerm, setSearchTerm] = useState('')

  const totalRestaurants = useSelector(selectRestaurantList)
  const newRestaurants = useSelector(selectAllNewRestaurants)
  const [metrics, setMetrics] = useState([
    
    { value:0, label: 'All Merchant', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
    { value:0, label: 'New Merchants', textColor: 'text-red-600', borderColor: 'border-[#FF5555]' },
    { value: 75, label: 'Active Restaurants', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
    { value: 25, label: 'Inactive Restaurants', textColor: 'text-red-600', borderColor: 'border-[#FF5555]' },
  ])
  const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getRestaurantList());
 
  dispatch(getNewRestaurants());
    
}, [dispatch])
useEffect(()=>{
  const totalRestaurantCount = totalRestaurants.length;
  const newRestaurantsCount = newRestaurants.length;
    setMetrics([
      { value: 75, label: 'Active Restaurants', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
      { value: 25, label: 'Inactive Restaurants', textColor: 'text-red-600', borderColor: 'border-[#FF5555]' },
      { value: totalRestaurantCount, label: 'All Merchants', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
      { value: newRestaurantsCount, label: 'New Merchants', textColor: 'text-red-600', borderColor: 'border-[#FF5555]' }, 
    ])
},[totalRestaurants, newRestaurants]);

  const filterOptions = [
    { label: 'success', value: "Success" },
    { label: 'pending', value: "Pending" },
    { label: 'rejected', value: "Rejected" },
  ]
  // const cardsData = [
    
  //   { value: 15, label: 'Restaurants with 0 orders', textColor: 'text-green-600', borderColor: 'border-[#40FF40]' },
  // ]
  const handleSearch =(term)=>{
    setSearchTerm(term);
  }

  return (
    <MainLayout>
      <div>
        <MetricsCard cards={metrics} onCardClick={(card) => console.log(`Clicked on ${card.label}`)}/>
        <div className=' flex  gap-5 mb-5'>
          <SearchBox onSearch={handleSearch} />
          <DateBox />
          <FilterDropdown
            value={onboarding}
            onChange={(value) => setOnboarding(value)}
            options={filterOptions}
          />
        </div>
        <div className="mb-44">
          <RestaurantTable onboarding={onboarding} searchTerm={searchTerm} />
        </div>
      </div>
    </MainLayout>
  )
}

export default ManageMerchant
