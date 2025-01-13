// import OnboardingData from "./OnboardingList";
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchMerchantListOnboarding, selectMerchantListOnboarding, selectMerchantError, selectMerchantLoading } from "../../../redux/slices/merchant";


const OnboardingTable = ({ onboarding, searchTerm }) => {
  const dispatch = useDispatch();

  const merchants = useSelector(selectMerchantListOnboarding);
  const loading = useSelector(selectMerchantLoading);
  const error = useSelector(selectMerchantError);


  useEffect(() => {
    dispatch(fetchMerchantListOnboarding({ onboarding }));
  }, [onboarding, dispatch]);

  const filteredMerchants = searchTerm ? merchants.filter((merchant) =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase())) : merchants;



  const columns = [{
    name: "SHOP NAME",
    selector: (row) => row.name,
    sortable: true,
  },
 
  {
    name: "GSTIN",
    selector: ""
  },
  {
    name: "FSSAI",
    selector: ""
  },
  {
    name: "C.P%",
    selector: ""
  },

  {
    name: "ADDON",
    selector: "",
  },
  {
    name: "PHONE NUMBER",
    selector: (row) => row.primary_phone,

  },
  {
    name: "EMAIL",
    selector: (row) => row.email,


  },
  {
    name:"TIMINGS",
    selector:""
  },
  {
    name:"OWNER",
    selector:""
  },
  {
    name: "CITY",
    selector: (row) => row.city,
  },


  {
    name: "CUISINE TYPE",
    selector: (row) => row.cuisine_type.join(','),
  },
  
  // {
  //     name:"ADDRESS",
  //     selector:(row)=>row.address,
  // },
  // {
  //     name:"ID PROOF",
  //     selector:(row)=>row.idproof,
  //     cell: () => <span style={{ color: "gray" }}>N/A</span>,
  // },
  // {
  //     name:"D.LIC",
  //     selector:(row)=>row.drivingLicense,
  //     cell: () => <span style={{ color: "gray" }}>N/A</span>,

  // },
  {
    name: "ACTION",
    cell: (row) => (
      <div className='flex flex-row'>
        <button
          style={{
            marginRight: "8px",
            backgroundColor: "#F9DFDF",
            color: "red",
            border: "1px solid red",
           padding: "5px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        // onClick={()=>handleReject(row)}
        >
          Reject
        </button>
        <button
          style={{
            backgroundColor: "#D8EBDA",
            color: "#00840D",
            border: "1px solid green",
            padding: "5px ",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        // onClick={() => handleLaunch(row)}
        >
          Launch
        </button>
      </div>
    )
  }
  ]
  const customStyles = {
    rows: {
      style: {
        height: "56px",
        backgroundColor: "#FFFFFF",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#F0F8FF",
        color: "#A3A3A3",
        fontWeight: "700",
        Height: "60px"
      },
    },
  };

  return (

    <div className="hide-scrollbar rounded-md gap-5  border-[1px] border-green-600 ml-5 overscroll-x-contain">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <DataTable

        columns={columns}
        data={filteredMerchants}
        highlightOnHover
        fixedHeader
        striped
        customStyles={customStyles}
      />
    </div>
  )
}

export default OnboardingTable
