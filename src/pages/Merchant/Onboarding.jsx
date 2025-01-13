import React, { useState } from "react";

import MetricsCard from "../../components/GeneralComponent/MetricsCard/MetricsCard";
import SearchBox from "../../components/GeneralComponent/SearchBox/SearchBox";
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";
import DateBox from "../../components/GeneralComponent/Dropdown/DateBox";
import FilterDropdown from "../../components/GeneralComponent/Dropdown/FilterDropdown";
import OnboardingTable from "../../modules/deliveryPartners/Onboarding/OnboardingTable";
import { useNavigate } from "react-router-dom";
import { getRestaurantList, selectRestaurantList, getNewRestaurants, selectAllNewRestaurants ,selectApiError,selectApiLoading } from '../../redux/slices/restaurant'
import { useDispatch, useSelector } from 'react-redux'



const Onboarding = () => {
  const [onboarding, setOnboarding] =useState('Pending');
   const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const filterOptions = [
      // { label: 'success', value: "Success" },
      { label: 'pending', value: "Pending" },
      { label: 'rejected', value: "Rejected" },
    ]
    const cardsData = [
        { value: 75, label: 'Active Restaurants', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
        { value: '2k', label: 'Total Orders', textColor: 'text-orange-600', borderColor: 'border-[#FF6B00]' },
        { value: 200, label: 'New Signups', textColor: 'text-green-700', borderColor: 'border-[#008B0E]' },
        { value: '+', label: 'New Restaurant', textColor: 'text-gray-500', borderColor: 'border-gray-300', route: '/onboardingform' },
      ];

    const handleCardClick = (card) =>{
        if (card.route){
            navigate(card.route)
        }
    }
    const handleSearch = (term) => {
      setSearchTerm(term)
    }

  return (
    <MainLayout>
      <div>
        <div className="">
          <MetricsCard cards={cardsData} onCardClick={handleCardClick}/>
          <div className=" flex  gap-5 mb-5">
            {/* Search Box */}
            <SearchBox onSearch={handleSearch} />
            {/* Date Box */}
            <DateBox />
            {/* Filter Dropdown */}
            <FilterDropdown value={onboarding}
            onChange={(value) => setOnboarding(value)}
            options={filterOptions}/>
          </div>
          <div className="mb-44">
            {/* Table below with gap */}
            <OnboardingTable onboarding={onboarding} searchTerm={searchTerm}/>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Onboarding
