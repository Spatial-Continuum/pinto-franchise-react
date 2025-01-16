import React from "react";


import MetricsCard from '../../components/GeneralComponent/MetricsCard/MetricsCard';
import SearchBox from '../../components/GeneralComponent/SearchBox/SearchBox'
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";
import DateBox from '../../components/GeneralComponent/Dropdown/DateBox';
import FilterDropdown from '../../components/GeneralComponent/Dropdown/FilterDropdown'
import OnboardingTable from '../../modules/deliveryPartners/Onboarding/OnboardingTable'

const DeliveryPartnerOnboarding = () => {
  const cardsData = [
    { value: 75, label: 'Active Restaurants', textColor: 'text-blue-600', borderColor: 'border-[#1E99FF]' },
    { value: '2k', label: 'Total Orders', textColor: 'text-orange-600', borderColor: 'border-[#FF6B00]' },
    { value: 200, label: 'New Signups', textColor: 'text-green-700', borderColor: 'border-[#008B0E]' },
    { value: '+', label: 'New Restaurant', textColor: 'text-gray-500', borderColor: 'border-gray-300', route: '/onboardingform' },
  ];
  const handleCardClick = (card) => {

  }
  const filterOptions = [
    // { label: 'success', value: "Success" },
    { label: 'live orders', value: "Pending" },
    { label: 'rejected', value: "Rejected" },
  ]

  return (
    <MainLayout>
      <div>
        <div className="">
          <MetricsCard cards={cardsData} onCardClick={handleCardClick} />
          <div className=" flex justify-between  mb-5">
            <div>
              {/* Filter Dropdown */}
              <FilterDropdown options={filterOptions} />
            </div>
            <div>
              {/* Search Box */}
              <SearchBox placeholder="search by name"/>
            </div>
          </div>
          <div className="mb-44">
            {/* Table below with gap */}
            <OnboardingTable />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeliveryPartnerOnboarding;