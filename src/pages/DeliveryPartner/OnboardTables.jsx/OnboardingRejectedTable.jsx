import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import RejectionReviewPopup from '../DeliveryPartnerPopups/RejectionReviewPopup'

const OnboardingRejectedTable = ({searchTerm}) => {
  const [rejectReviewPopup, setRejectReviewPopup] = useState(false)
    const dummyData=[  {
        name: "Jane Smith",
        dob: "1990-05-15",
        phoneNo: "9876543210",
        email: "jane.smith@example.com",
        appliedOn: "2022-05-01",
        reason:"im busy with work"
        
      }
      ]

      const filteredData = searchTerm? dummyData.filter((item)=>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dob.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phoneNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.appliedOn.toLowerCase().includes(searchTerm.toLowerCase())):dummyData
      const columns =[
        {
          name:"NAME",
          selector: (row)=> row.name,
          sortable:true,
        },
        {
          name:"DOB",
          selector: (row)=> row.dob,
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
          name:"REASON",
          selector: (row)=> row.reason,
          sortable:true,
        },
        {
          name:"ACTION",
          cell: () => (
            <button className='border-[0.5px] rounded-lg px-2 py-1 border-[#424242] text-[#424242] bg-[#F1F1F1]'
            onClick={()=>setRejectReviewPopup(true)}>
              Review
            </button>
          ),
        }
      ]

      const handleClose=() => {
        setRejectReviewPopup(false)
      }
    
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
            data={filteredData}
            highlightOnHover
            //fixedHeader
            striped
            customStyles={customStyles}
          />
        </div>
        {
          rejectReviewPopup &&
          <RejectionReviewPopup onClose={handleClose} />
        }
        </>
      )
    }

export default OnboardingRejectedTable
