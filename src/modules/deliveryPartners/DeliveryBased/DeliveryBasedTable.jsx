import DeliveryBasedData from "./DeliveryBasedList";
import React from 'react'

import DataTable from "react-data-table-component";
const DeliveryBasedTable = () => {
    const columns =[
        {
            name:"PARTNER ID",
            selector: (row)=> row.partnerId,
            sortable:true,

        },
        {
            name:"NAME",
            selector: (row)=> row.name,
            sortable:true,

        },
        {
            name: "STATUS",
            selector: (row) => row.status,
            sortable: true,
            cell: (row) => {
              const statusColor = row.status === "ONLINE" ? "#008B0E" :"#FF6B00";
           
              return (
                <span style={{ color: statusColor, fontWeight: "bold" }}>
                  {row.status}
                </span>
              );
            },
          },
        {
            name:"JOIN DATE",
            selector: (row)=> row.joinDate,
            sortable:true,

        }, 
        {
            name:"PHONE",
            selector: (row)=> row.phone,
            sortable:true,

        },
        {
            name:"ORDERS",
            selector: (row)=> row.orders,
            sortable:true,

        },
        {
            name:"ORDER VALUE",
            selector: (row)=> row.orderValue,
            sortable:true,

        },
        {
            name:"DELIVERY FEE",
            selector: (row)=> row.deliveryValue,
            sortable:true,

        }, 
        {
            name:"COMMISSION",
            selector:(row)=> row.commision,
            sortable:true,
        }   
    ]

    const customStyles = {
        
        rows: {
            
            style: (row) => ({
                height: "56px",
                // override the row height
                backgroundColor: row.status === "OFFLINE" ? "#989898" : "#FFFFFF", // Apply background color based on status
              }),
        },
        headCells: {
            style: {
                backgroundColor:"#F0F8FF",
                color :"#A3A3A3",
                fontWeight:700,
                Height:"60px"            },
        },
        cells: {
            style: {
                

            },
        },
    };
   
  return (
    <div className="hide-scrollbar rounded-md gap-5 w-3/4 border-[1px] border-green-600 ml-5">
    <DataTable 
      columns={columns}
      data={DeliveryBasedData}
      highlightOnHover
      striped
      fixedHeader
      customStyles={customStyles}
      
     
    />
  </div>   
    
  )
}

export default DeliveryBasedTable
