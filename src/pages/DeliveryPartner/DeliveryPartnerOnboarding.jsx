import React from "react";


import MetricsCard from "../../components/GeneralComponent/MetricsCard/MetricsCard";
import SearchBox from "../../components/GeneralComponent/SearchBox/SearchBox";
import Main from "../../layouts/Main";
import DateBox from "../../components/GeneralComponent/Dropdown/DateBox";
import FilterDropdown from "../../components/GeneralComponent/Dropdown/FilterDropdown";
import OnboardingTable from "../../modules/deliveryPartners/Onboarding/OnboardingTable";

const DeliveryPartnerOnboarding = () => {
  return (
    <Main>
      <div>
        <div className="">
          <MetricsCard />
          <div className=" flex  gap-5 mb-5">
            {/* Search Box */}
            <SearchBox />
            {/* Date Box */}
            <DateBox />
            {/* Filter Dropdown */}
            <FilterDropdown />
          </div>
          <div className="mb-44">
            {/* Table below with gap */}
            <OnboardingTable/>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default DeliveryPartnerOnboarding;