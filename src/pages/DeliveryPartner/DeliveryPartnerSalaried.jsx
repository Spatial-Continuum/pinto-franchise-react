import React from "react";

import SalariedTable from '../../modules/deliveryPartners/Salaried/SalariedTable'
import MetricsCard from '../../components/GeneralComponent/MetricsCard/MetricsCard'
import SearchBox from '../../components/GeneralComponent/SearchBox/SearchBox'

import DateBox from "../../components/GeneralComponent/Dropdown/DateBox"
import FilterDropdown from '../../components/GeneralComponent/Dropdown/FilterDropdown'
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";


const DeliveryPartnerSalaried = () => {
  const cardsData = [
    { value: 75, label: 'Active Restaurants', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
    { value: '2k', label: 'Total Orders', textColor: 'text-orange-600', borderColor: 'border-[#FF6B00]' },
    { value: 200, label: 'New Signups', textColor: 'text-green-700', borderColor: 'border-[#008B0E]' },
    { value: '+', label: 'New Restaurant', textColor: 'text-gray-500', borderColor: 'border-gray-300', route: '/onboardingform' },
  ];
  
  const filterOptions = [
    // { label: 'success', value: "Success" },
    { label: 'live orders', value: "Pending" },
    { label: 'rejected', value: "Rejected" },
]
  const handleCardClick = (card) =>{
    // if (card.route){
    //     navigate(card.route)
    // }
}


  return (
    <MainLayout>
      <div>
        <div className="">
          <MetricsCard cards={cardsData} onCardClick={handleCardClick} />
          <div className=" flex justify-between mb-5">
            <div>
            <SearchBox placeholder="search by name"/>
            </div>
            <div className="flex grid-cols-2 gap-5">
              {/* Filter Dropdown */}
            <FilterDropdown options={filterOptions}/>
            {/* Date Box */}
            <DateBox />
            
            </div>
          </div>
          <div className="mb-44">
            {/* Table below with gap */}
            <SalariedTable />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeliveryPartnerSalaried;
