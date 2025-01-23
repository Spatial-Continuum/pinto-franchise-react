import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import addon from '../../../assets/images/addonview.svg';
import OnboardPopup from '../DeliveryPartnerPopups/OnboardPopup';

const OnboardingVerifiedTable = () => {
  const [onboardPopup,setOnboardPopup] = useState(false)
  const handleClose = ()=>{
    setOnboardPopup(false)
  }
    const dummyData=[  {
        name: "Jane Smith",
        dob: "1990-05-15",
        phoneNo: "9876543210",
        email: "jane.smith@example.com",
        appliedOn: "2022-05-01",
        
      }
      ]

      
      const columns =[
        {
          name:"NAME",
          selector: (row)=> row.name,
          sortable:true,
        },
        {
          name:"DOB",
          selector: (row)=> row.name,
          sortable:true,
        },
        {
          name:"PHONE NO",
          selector: (row)=> row.phoneNo,
          sortable:true,
        },
        {
          name:"EMAIL",
          selector: (row)=> row.email,
          sortable:true,
        },
        {
         name:"VIEW DOCS",
          selector: (row) => (
             <div
               style={{
                 display: "flex", justifyContent: "center", alignItems: "center", height: "100%",
               }}
             >
               <img
                 src={addon} alt="menu" style={{ cursor: "pointer", width: "18px", height: "18px" }}
                 onClick={() => handleAddressPopup(row)}
         
               />
             </div>
           ),
        },
        {
          name:"ACTION",
          cell: () => (
            <button className='border-[0.5px] rounded-lg px-2 py-1 border-[#424242] text-[#424242] bg-[#F1F1F1]'
            onClick={()=>setOnboardPopup(true)}
            >
              On Board
            </button>
          ),
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
        <>
        <div className="hide-scrollbar rounded-md gap-5  border-[1px] border-green-600  overscroll-x-contain">
          {/* {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>} */}
          <DataTable
    
            columns={columns}
            data={dummyData}
            highlightOnHover
            // fixedHeader
            striped
            customStyles={customStyles}
          />
        </div>

        {onboardPopup && 
        <OnboardPopup onClose={handleClose}/>}
        </>
      )
    }
export default OnboardingVerifiedTable
