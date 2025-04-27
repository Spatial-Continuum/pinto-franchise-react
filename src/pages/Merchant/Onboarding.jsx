import React, { useEffect, useState } from "react";
import MetricsCard from "../../components/GeneralComponent/MetricsCard/MetricsCard";
import SearchBox from "../../components/GeneralComponent/SearchBox/SearchBox";
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";
import { useNavigate } from "react-router-dom";
import search from "../../assets/images/prime_search.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurantPending,
  getAllRestaurantRejected,
  selectRejectedRestaurants,
  selectPendingRestaurants,
  getAllRestaurantSuccess,
  selectSuccessRestaurants,
} from "../../redux/slices/restaurant";
import OnboardingPendingTable from "../../modules/deliveryPartners/Onboarding/OnboardingPendingTable";
import OnboardingRejectedTable from "../../modules/deliveryPartners/Onboarding/OnboardingRejectedTable";

const Onboarding = () => {
  const [selectedTab, setSelectedTab] = useState("Pending"); // Track selected tab
  const [searchTerm, setSearchTerm] = useState("");
  const successRestaurants = useSelector(selectSuccessRestaurants);
  const pendingRestaurants = useSelector(selectPendingRestaurants);
  const rejectedRestaurants = useSelector(selectRejectedRestaurants);
  console.log("skjdfjhwlke", rejectedRestaurants);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllRestaurantPending()).unwrap();
        await dispatch(getAllRestaurantRejected()).unwrap();
        await dispatch(getAllRestaurantSuccess()).unwrap();
      } catch (err) {
        console.error("Error during data fetch:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  const cardsData = [
    {
      value: pendingRestaurants?.length || 0,
      label: "Pending Approval",
      textColor: "text-[#1E99FF]",
      borderColor: "border-[#1E99FF]",
    },
    {
      value: rejectedRestaurants?.length || 0,
      label: "Rejected",
      textColor: "text-[#FF6B00]",
      borderColor: "border-[#FF6B00]",
    },
    {
      value: successRestaurants?.length || 0,
      label: "On boarded",
      textColor: "text-[#720F3D]",
      borderColor: "border-[#720F3D]",
    },
    {
      value: "+",
      label: "Add New Merchant",
      textColor: "text-gray-500",
      borderColor: "border-gray-300",
      route: "/onboardingform",
    },
  ];

  const handleCardClick = (card) => {
    if (card.route) {
      navigate(card.route);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <MainLayout headerName="Merchant Onboarding">
      <div>
        <MetricsCard cards={cardsData} onCardClick={handleCardClick} />

        <div className="flex justify-between">
          {/* Tab Navigation */}
          <div className="flex gap-6 border-b pb-2 mb-5 mt-5 ">
            <div
              className={`cursor-pointer text-lg font-semibold rounded-sm ${
                selectedTab === "Pending"
                  ? "text-black border-b-4 border-orange-600"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("Pending")}
            >
              Pending
            </div>
            <div
              className={`cursor-pointer text-lg font-semibold rounded-sm ${
                selectedTab === "Rejected"
                  ? "text-black border-b-4 border-orange-600"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("Rejected")}
            >
              Rejected
            </div>
          </div>
          <div>
            {/* Search Box */}
            <SearchBox
              onSearch={handleSearch}
              placeholder="Search here"
              img={search}
            />
          </div>
        </div>
        {/* 
        {/* Conditional Rendering of Tables */}
        <div className="mb-44 ">
          {selectedTab === "Pending" && (
            <OnboardingPendingTable searchTerm={searchTerm} />
          )}
          {selectedTab === "Rejected" && (
            <OnboardingRejectedTable searchTerm={searchTerm} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Onboarding;

//<OnboardingTable onboarding={onboarding} searchTerm={searchTerm}/>
