import React from "react";


import MetricsCard from '../../components/GeneralComponent/MetricsCard/MetricsCard';
import SearchBox from '../../components/GeneralComponent/SearchBox/SearchBox'
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";
import OnboardingTable from '../../modules/deliveryPartners/Onboarding/OnboardingTable'
import OnboardingPendingTable from "./OnboardTables.jsx/OnboardingPendingTable";
import OnboardingVerifiedTable from "./OnboardTables.jsx/OnboardingVerifiedTable";
import OnboardingRejectedTable from "./OnboardTables.jsx/OnboardingRejectedTable";
import { useState } from "react";
const DeliveryPartnerOnboarding = () => {

  const [currentStep, setCurrentStep] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  const cardsData = [
    { value: 75, label: 'Verified Pending', textColor: 'text-[#509CDB]', borderColor: 'border-[#509CDB]' },
    { value: '2k', label: 'Verified', textColor: 'text-[#008B0E]', borderColor: 'border-[#008B0E]' },
    { value: 200, label: 'Rejected', textColor: 'text-[#FF2121]', borderColor: 'border-[#FF2121]' },
    { value: '234', label: 'Onboarded', textColor: 'text-[#720F3D]', borderColor: 'border-[#720F3D]' },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
  };


  return (
    <MainLayout>
      <div>
        <div className="">
          <MetricsCard cards={cardsData}  />

          <div className="mb-44">
            <div className=" flex justify-between">
              <div className="progress-navbar flex gap-6 relative ">
              <hr className="absolute top-8 left-0 w-full  border-[#E6E6E6] border-[1px]" />

                {/* Pending Step */}
                <div
                  className={`step-heading relative cursor-pointer text-lg ${currentStep === 1 ? 'active' : ''}`}
                  onClick={() => setCurrentStep(1)}
                >
                  Pending
                  <div
                    className={`underline-offset-8 h-1 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 1 ? 'w-full' : 'w-0'}`}
                  ></div>
                </div>

                {/* Verified Step */}
                <div
                  className={`step-heading relative cursor-pointer text-lg ${currentStep === 2 ? 'active' : ''}`}
                  onClick={() => setCurrentStep(2)}
                >
                  Verified
                  <div
                    className={`underline-offset-8 h-1 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 2 ? 'w-full' : 'w-0'}`}
                  ></div>
                </div>

                {/* Rejected Step */}
                <div
                  className={`step-heading relative cursor-pointer text-lg ${currentStep === 3 ? 'active' : ''}`}
                  onClick={() => setCurrentStep(3)}
                >
                  Rejected
                  <div
                    className={`underline-offset-8 h-1 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 3 ? 'w-full' : 'w-0'}`}
                  ></div>
                </div>

                {/* On-Boarded Step */}
                <div
                  className={`step-heading relative cursor-pointer text-lg ${currentStep === 4 ? 'active' : ''}`}
                  onClick={() => setCurrentStep(4)}
                >
                  On-Boarded
                  <div
                    className={`underline-offset-8 h-1 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 4 ? 'w-full' : 'w-0'}`}
                  ></div>
                </div>
              </div>
              <div>
                <div >
                  {/* Search Box */}
                  <SearchBox placeholder="Search by name"
                    onSearch={handleSearch}
                    value={searchTerm} />
                </div>
              </div>
            </div>



            {/* Render components based on the currentStep */}
            {currentStep === 1 && <OnboardingPendingTable searchTerm ={searchTerm}/>}
            {currentStep === 2 && <OnboardingVerifiedTable searchTerm ={searchTerm}/>}
            {currentStep === 3 && <OnboardingRejectedTable searchTerm ={searchTerm} />}
            {currentStep === 4 && <OnboardingTable  searchTerm ={searchTerm}/>}



          </div>
        </div>
      </div>
    </MainLayout >
  );
};

export default DeliveryPartnerOnboarding;