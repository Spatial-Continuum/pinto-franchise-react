import OnboardingData from "./OnboardingList";
import React from 'react'
import DataTable from "react-data-table-component";
import '../../../assets/styles/onboardingTable.css';
const OnboardingTable = () => {
    const columns = [{
        name:"NAME",
            selector: (row)=> row.name,
            sortable:true,
    },
    {
        name:"DOB",
        selector: (row)=>row.dob,
        
    },
    {
        name:"PHONE NUMBER",
        selector: (row)=> row.phoneNumber,
        
    },
    {
        name:"EMIAL",
        selector:(row)=>row.email,
    },
    {
        name:"TYPE",
        selector: (row)=>row.type,

    },
    {
        name:"EMERGENCY CONTACT",
        selector:(row)=>row.emergency,
    },
    {
        name:"BG",
        selector:(row)=>row.bloodGroup,

    },
    {
        name:"ADDRESS",
        selector:(row)=>row.address,
    },
    {
        name:"ID PROOF",
        selector:(row)=>row.idproof,
        cell: () => <span style={{ color: "gray" }}>N/A</span>,
    },
    {
        name:"D.LIC",
        selector:(row)=>row.drivingLicense,
        cell: () => <span style={{ color: "gray" }}>N/A</span>,

    },
    {
        name:"ACTION",
        cell: (row) => (
            <div>
              <button
                style={{
                  marginRight: "8px",
                  backgroundColor: "red",
                  color: "white",
                  border:"1px solid red",
                padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                // onClick={()=>handleReject(row)}
              >
                Reject
              </button>
              <button
            style={{
              backgroundColor: "green",
              color: "white",
              border: "1px solid green",
              padding: "5px 10px",
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
        backgroundColor:"#FFFFFF",
        width:"100%",
        
    },
    },
    headCells: {
      style: {
        backgroundColor: "#F0F8FF",
        color: "#A3A3A3",
        fontWeight: "700",
        Height:"60px"  
      },
    },
  };

  return (
    <div className="onboarding-Table">
      <DataTable
        
        columns={columns}
        data={OnboardingData}
        highlightOnHover
        fixedHeader
        striped
        customStyles={customStyles}
      />
    </div>
  )
}

export default OnboardingTable
