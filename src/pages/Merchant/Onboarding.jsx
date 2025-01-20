import React, { useState } from "react";

import MetricsCard from "../../components/GeneralComponent/MetricsCard/MetricsCard";
import SearchBox from "../../components/GeneralComponent/SearchBox/SearchBox";
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";
import DateBox from "../../components/GeneralComponent/Dropdown/DateBox";
import FilterDropdown from "../../components/GeneralComponent/Dropdown/FilterDropdown";

import search from '../../assets/images/prime_search.svg';
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
        { value: 75, label: 'Pending Approval', textColor: 'text-[#1E99FF]', borderColor: 'border-[#1E99FF]' },
        { value: '2k', label: 'Rejected', textColor: 'text-[#FF6B00]', borderColor: 'border-[#FF6B00]' },
        { value: '+', label: 'Add New Merchant', textColor: 'text-gray-500', borderColor: 'border-gray-300', route: '/onboardingform' },
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
          <div className=" flex justify-between gap-5 mb-5">
            
            
            <FilterDropdown value={onboarding}
            onChange={(value) => setOnboarding(value)}
            options={filterOptions}/>

            {/* Search Box */}
            <SearchBox onSearch={handleSearch} img={search} placeholder="search here" />
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
