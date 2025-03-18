import React, { useEffect, useState } from "react";

import SalariedTable from "../../modules/deliveryPartners/Salaried/SalariedTable";
import MetricsCard from "../../components/GeneralComponent/MetricsCard/MetricsCard";
import SearchBox from "../../components/GeneralComponent/SearchBox/SearchBox";
import search from "../../assets/images/prime_search.svg";
import DateBox from "../../components/GeneralComponent/Dropdown/DateBox";
import FilterDropdown from "../../components/GeneralComponent/Dropdown/FilterDropdown";
import MainLayout from "../../components/GeneralComponent/Layout/MainLayout";
import {
  selectOnboardingSuccess,
  getOnboardingData,
  getOnboardingStatus,
} from "../../redux/slices/onboardingDeliveryPartner";
import { useDispatch, useSelector } from "react-redux";

const ManagePartners = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("Dispatching getfetchApi");
    dispatch(getOnboardingData({ status: "Success" }));
    const fetchData = async () => {
      const result = await fetchAllOnboardingStatuses(dispatch);
      setData(result);
      console.log("tattaata", result);
    };

    fetchData();
  }, [dispatch]);
  console.log("chachacha", data);
  const SalaryOnline = data?.SalaryOnline?.payload?.results?.total_count;
  const SalaryOffline = data?.SalaryOffline?.payload?.results?.total_count;
  const commissionOffline =
    data?.commissionOffline?.payload?.results?.total_count;
  const commissionOnline =
    data?.commissionOnline?.payload?.results?.total_count;
  const cardsData = [
    {
      value: `${SalaryOnline}`,
      label: "Salaried",
      textColor: "text-[#1E99FF]",
      borderColor: "border-[#1E99FF]",
      text1: "ACTIVE",
    },
    {
      value: `${SalaryOffline}`,
      label: "Salried",
      textColor: "text-[#FF6B00]",
      borderColor: "border-[#FF6B00]",
      text1: "OFFLINE",
    },
    {
      value: `${commissionOnline}`,
      label: "Delivery based",
      textColor: "text-[#1E99FF]",
      borderColor: "border-[#1E99FF]",
      text1: "ACTIVE",
    },
    {
      value: `${commissionOffline}`,
      label: "Delivery based",
      textColor: "text-[#FF6B00]",
      borderColor: "border-[#FF6B00]",
      text1: "OFFLINE",
    },
    {
      value:
        parseInt(commissionOnline) +
        parseInt(commissionOffline) +
        parseInt(SalaryOffline) +
        parseInt(SalaryOnline),
      label: "All Partners",
      textColor: "text-[#008B0E]",
      borderColor: "border-[#008B0E]",
      text1: "",
    },
  ];

  const filterOptions = [
    // { label: 'success', value: "Success" },
    { label: "All Partners", value: "Pending" },
    { label: "Active Salaried", value: "Rejected" },
    { label: "Offline Salaried", value: "Rejected" },
    { label: "Active Delivery based", value: "Rejected" },
    { label: "Offline Delivery based", value: "Rejected" },
    { label: "Overall Salaried", value: "Rejected" },
    { label: "Overall Delivery based", value: "Rejected" },
  ];
  const handleCardClick = (card) => {
    // if (card.route){
    //     navigate(card.route)
    // }
  };
  const fetchAllOnboardingStatuses = async (dispatch) => {
    try {
      const results = await Promise.all([
        dispatch(
          getOnboardingStatus({
            status_type: "Online",
            partner_type: "Salaried",
          })
        ),
        dispatch(
          getOnboardingStatus({
            status_type: "Offline",
            partner_type: "Salaried",
          })
        ),
        dispatch(
          getOnboardingStatus({
            status_type: "Online",
            partner_type: "Commission",
          })
        ),
        dispatch(
          getOnboardingStatus({
            status_type: "Offline",
            partner_type: "Commission",
          })
        ),
      ]);

      const [SalaryOnline, SalaryOffline, commissionOnline, commissionOffline] =
        results;

      console.log("SalaryOnline:", SalaryOnline);
      console.log("SalaryOffline:", SalaryOffline);
      console.log("CommissionOnline:", commissionOnline);
      console.log("CommissionOffline:", commissionOffline);

      return {
        SalaryOnline,
        SalaryOffline,
        commissionOnline,
        commissionOffline,
      };
    } catch (error) {
      console.error("Error fetching onboarding statuses:", error);
      return null;
    }
  };
  const onboardingSuccess = useSelector(selectOnboardingSuccess);
  const row = onboardingSuccess?.results?.delivery_partners || [];
  const header = [
    {
      name: "S.No",
      selector: (row, index) => (index = index + 1),
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row?.user_details?.username,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.current_status,
      sortable: true,
      cell: (row) => {
        const statusColor =
          row.current_status === "ONLINE" ? "#008B0E" : "#FF6B00";

        return (
          <span style={{ color: statusColor, fontWeight: "bold" }}>
            {row.current_status}
          </span>
        );
      },
    },

    {
      name: "EMPLOYMENT TYPE",
      selector: (row) =>
        row.employment_type === "Salaried" ? "Salaried" : "Commission",
      sortable: true,
    },

    {
      name: "JOINING DATE",
      selector: (row) => {
        if (!row.last_online) return "N/A"; // Fix: Handle missing values
        const dateObj = new Date(row.last_online);
        return `${dateObj.getDate().toString().padStart(2, "0")}/${(
          dateObj.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${dateObj.getFullYear()}`;
      },
      sortable: true,
    },
    {
      name: "PHONE",

      selector: (row) => row?.user_details?.phone,
      sortable: true,
    },

    {
      name: "TOTAL ORDERS",
      selector: (row) => row.total_orders,
      sortable: true,
    },
    {
      name: "TOTAL REVENUE",
      selector: (row) => row.total_revenue,
      sortable: true,
    },
    {
      name: "SALARY",
      selector: (row) => row.pending_amount,
      sortable: true,
    },
  ];

  console.log("kjashefoihweiojw", onboardingSuccess);
  console.log("jkhsdoiensdmfl;s");
  console.log("aklsljfw");
  return (
    <MainLayout headerName="Delivery Partners">
      <div>
        <div className="">
          <MetricsCard cards={cardsData} onCardClick={handleCardClick} />
          <div className=" flex justify-between mb-5">
            <div>
              <SearchBox placeholder="search by name" img={search} />
            </div>
            <div className="flex grid-cols-2 gap-5">
              {/* Filter Dropdown */}
              <FilterDropdown options={filterOptions} />
              {/* Date Box */}
              <DateBox />
            </div>
          </div>
          <div className="mb-44">
            {/* Table below with gap */}
            <SalariedTable columns={header} data={row} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagePartners;
