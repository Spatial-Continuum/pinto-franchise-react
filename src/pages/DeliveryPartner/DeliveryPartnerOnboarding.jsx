import React from "react";


import MetricsCard from '../../components/GeneralComponent/MetricsCard/MetricsCard';
import SearchBox from '../../components/GeneralComponent/SearchBox/SearchBox'
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";
import DateBox from '../../components/GeneralComponent/Dropdown/DateBox';
import FilterDropdown from '../../components/GeneralComponent/Dropdown/FilterDropdown'
import OnboardingTable from '../../modules/deliveryPartners/Onboarding/OnboardingTable'
import OnboardingPendingTable from "./OnboardTables.jsx/OnboardingPendingTable";
import OnboardingVerifiedTable from "./OnboardTables.jsx/OnboardingVerifiedTable";
import OnboardingRejectedTable from "./OnboardTables.jsx/OnboardingRejectedTable";
import { useState } from "react";
const DeliveryPartnerOnboarding = () => {

  const [currentStep, setCurrentStep] = useState(4);
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
              <SearchBox placeholder="search by name" />
            </div>
          </div>
          <div className="mb-44">
            <div className="progress-navbar flex gap-6 mx-5 my-4">
              {/* Pending Step */}
              <div
                className={`step-heading relative cursor-pointer ${currentStep === 1 ? 'active' : ''}`}
                onClick={() => setCurrentStep(1)}
              >
                Pending
                <div
                  className={`underline-offset-8 h-2 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 1 ? 'w-full' : 'w-0'}`}
                ></div>
              </div>

              {/* Verified Step */}
              <div
                className={`step-heading relative cursor-pointer ${currentStep === 2 ? 'active' : ''}`}
                onClick={() => setCurrentStep(2)}
              >
                Verified
                <div
                  className={`underline-offset-8 h-2 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 2 ? 'w-full' : 'w-0'}`}
                ></div>
              </div>

              {/* Rejected Step */}
              <div
                className={`step-heading relative cursor-pointer ${currentStep === 3 ? 'active' : ''}`}
                onClick={() => setCurrentStep(3)}
              >
                Rejected
                <div
                  className={`underline-offset-8 h-2 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 3 ? 'w-full' : 'w-0'}`}
                ></div>
              </div>

              {/* On-Boarded Step */}
              <div
                className={`step-heading relative cursor-pointer ${currentStep === 4 ? 'active' : ''}`}
                onClick={() => setCurrentStep(4)}
              >
                On-Boarded
                <div
                  className={`underline-offset-8 h-2 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 4 ? 'w-full' : 'w-0'}`}
                ></div>
              </div>
            </div>
          


          {/* Render components based on the currentStep */}
          {currentStep === 1 && <OnboardingPendingTable />}
          {currentStep === 2 && <OnboardingVerifiedTable />}
          {currentStep === 3 && <OnboardingRejectedTable />}
          {currentStep === 4 && <OnboardingTable />}



        </div>
      </div>
    </div>
    </MainLayout >
  );
};

export default DeliveryPartnerOnboarding;