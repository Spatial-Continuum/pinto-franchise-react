import React, { useEffect, useState } from 'react'
import MetricsCard from '../../../components/GeneralComponent/MetricsCard/MetricsCard'
import SearchBox from '../../../components/GeneralComponent/SearchBox/SearchBox'
import search from '../../../assets/images/prime_search.svg';
import MainLayout from '../../../components/GeneralComponent/Layout/MainLayout'
import FilterDropdown from '../../../components/GeneralComponent/Dropdown/FilterDropdown'
import RestaurantTable from './RestaurantTable'
import DateBox from '../../../components/GeneralComponent/Dropdown/DateBox'
import { getRestaurantList,getAllRestaurantSuccess,selectSuccessRestaurants, selectRestaurantList, getNewRestaurants, selectAllNewRestaurants, selectApiError, selectApiLoading } from '../../../redux/slices/restaurant'

import { useDispatch, useSelector } from 'react-redux'
import SortBy from '../../../components/GeneralComponent/Dropdown/SortBy'
import Filter from '../../../components/GeneralComponent/Dropdown/Filter'
const ManageMerchant = () => {
  const [onboarding, setOnboarding] = useState('Success')
  const [searchTerm, setSearchTerm] = useState('')
const successRestaurants = useSelector(selectSuccessRestaurants)
  const totalRestaurants = useSelector(selectRestaurantList)
  const newRestaurants = useSelector(selectAllNewRestaurants)
  const [metrics, setMetrics] = useState([

    // { value: 0, label: 'All Merchant', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
    // { value: 0, label: 'New Merchants' , textColor: 'text-red-600', borderColor: 'border-[#020D6E]' },
    // { value: 75, label: 'Online Restaurants', textColor: 'text-blue-600', borderColor: 'border-[#008B0E]' },
    // { value: 25, label: 'Offline Restaurants', textColor: 'text-red-600', borderColor: 'border-[#FF6B00]' },
  ])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurantList());
    dispatch(getAllRestaurantSuccess())
    dispatch(getNewRestaurants());

  }, [dispatch])
  useEffect(() => {
    // const totalRestaurantCount = totalRestaurants.length;
    const newRestaurantsCount = newRestaurants.length;
    const allRestaurantCount = successRestaurants.length
    setMetrics([
      { value: 75, label: 'Online Restaurants', textColor: 'text-[#008B0E]', borderColor: 'border-[#008B0E]' },
      { value: 25, label: 'Offline Restaurants', textColor: 'text-[#FF6B00]', borderColor: 'border-[#FF6B00]' },
      { value: allRestaurantCount, label: 'All Merchants', textColor: 'text-[#1E99FF]', borderColor: 'border-[#1E99FF]' },
      { value: newRestaurantsCount, label: 'New Merchants', textColor: 'text-[#020D6E]', borderColor: 'border-[#020D6E]', text1:'Last 30 days' },
    ])
  }, [totalRestaurants, newRestaurants]);

  const filterOptions = [
    { label: 'New Merchants', value: "Success" },
    { label: 'Active Merchants', value: "Success" },
    { label: 'Offline Merchants', value: "Success" },
    // { label: 'Pending', value: "Pending" },
    // { label: 'Rejected', value: "Rejected" },
  ]
  // const cardsData = [

  //   { value: 15, label: 'Restaurants with 0 orders', textColor: 'text-green-600', borderColor: 'border-[#40FF40]' },
  // ]
  const handleSearch = (term) => {
    setSearchTerm(term);
  }
  const sortOptions = [
    { label: "sort-by", value: '' },
    { label: 'Name (Z-A)', value: 'name-desc' },
    { label: 'Order (Ascending)', value: 'order-asc' },
    { label: 'Order (Descending)', value: 'order-desc' },
  ];
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
  ];

  return (
    <MainLayout headerName="Manage Merchant">
      <div>
        <MetricsCard cards={metrics} onCardClick={(card) => console.log(`Clicked on ${card.label}`)} />
        <div className=' flex justify-between  gap-5 mb-5'>
          <div className=''>
            <FilterDropdown
              value={onboarding}
              onChange={(value) => setOnboarding(value)}
              options={filterOptions}
            />
          </div>
          <div className='flex  grid-row-3 gap-3'>


            <SearchBox onSearch={handleSearch} img={search} placeholder="search name" />
            <Filter options={filters} />
            <SortBy options={sortOptions} />

          </div>
        </div>
        <div className="mb-44">
          <RestaurantTable onboarding={onboarding} searchTerm={searchTerm} />
        </div>
      </div>
    </MainLayout>
  )
}

export default ManageMerchant
