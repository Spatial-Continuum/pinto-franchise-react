import React from "react";

import SalariedTable from '../../modules/deliveryPartners/Salaried/SalariedTable'
import MetricsCard from '../../components/GeneralComponent/MetricsCard/MetricsCard'
import SearchBox from '../../components/GeneralComponent/SearchBox/SearchBox'
import search from'../../assets/images/prime_search.svg';
import DateBox from "../../components/GeneralComponent/Dropdown/DateBox"
import FilterDropdown from '../../components/GeneralComponent/Dropdown/FilterDropdown'
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";


const ManagePartners = () => {
  const cardsData = [
    { value: 75, label: 'Salaried', textColor: 'text-[#1E99FF]', borderColor: 'border-[#1E99FF]', text1:'ACTIVE'},
    { value: '2k', label: 'Salried', textColor: 'text-[#FF6B00]', borderColor: 'border-[#FF6B00]' , text1:'OFFLINE'},
    { value: 200, label: 'Delivery based', textColor: 'text-[#1E99FF]', borderColor: 'border-[#1E99FF]', text1:'ACTIVE' },
    { value: '2k', label: 'Delivery based', textColor: 'text-[#FF6B00]', borderColor: 'border-[#FF6B00]', text1:'OFFLINE' },
    { value: 200, label: 'All Partners', textColor: 'text-[#008B0E]', borderColor: 'border-[#008B0E]', text1:'' },
   
  ];
  
  const filterOptions = [
    // { label: 'success', value: "Success" },
    { label: 'All Partners', value: "Pending" },
    { label: 'Active Salaried', value: "Rejected" },
    { label: 'Offline Salaried', value: "Rejected" },
    { label: 'Active Delivery based', value: "Rejected" },
    { label: 'Offline Delivery based', value: "Rejected" },
    { label: 'Overall Salaried', value: "Rejected" },
    {label:'Overall Delivery based', value: "Rejected" },
]
  const handleCardClick = (card) =>{
    // if (card.route){
    //     navigate(card.route)
    // }
}


  return (
    <MainLayout headerName="Delivery Partners">
      <div>
        <div className="">
          <MetricsCard cards={cardsData} onCardClick={handleCardClick} />
          <div className=" flex justify-between mb-5">
            <div>
            <SearchBox placeholder="search by name" img={search}/>
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

export default ManagePartners;
