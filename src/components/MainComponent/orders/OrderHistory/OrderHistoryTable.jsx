import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { format } from "date-fns";
import { getAllOrderHistory, selectAllOrderHistory, selectError,selectLoading } from '../../../../redux/slices/ordersHistory';
const OrderHistoryTable = ({searchTerm}) => {
    const dispatch = useDispatch()
    const orderHistoryData = useSelector(selectAllOrderHistory)
    


    const filteredOrderHistoryData =
    !searchTerm || searchTerm.trim() === ""
      ? orderHistoryData
      : orderHistoryData?.filter((order) => {
          const formattedDate = format(new Date(order.created_at), "dd-MM-yyyy"); // Format date
          return (
            order?.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) || // Match Order ID
            order?.restaurant_name?.toLowerCase().includes(searchTerm.toLowerCase()) || // Match Restaurant
            formattedDate.includes(searchTerm) // Match Date
          );
        });


    useEffect(()=>{
        dispatch(getAllOrderHistory())
    },[dispatch])

    const columns = [{
        name: "DATE",
        width:"200px",
        selector: (row) => format(new Date(row.created_at), "dd-MM-yyyy hh:mm a"),
        sortable: true,
    },

    {
        name: "ORDER ID",
        selector: ""
    },
    {
        name: "RESTAURANT",
        selector: ""
    },
    {
        name: "ADDRESS",
        selector: ""
    },

    {
        name: "PHONE",
        selector: "",
    },
    {
        name: "ORDER FOOD",
        selector: ""

    },
    {
        name: "CUSTOMER",
        selector: ""


    },
    {
        name: "PHONE",
        selector: ""
    },
    {
        name: "AMOUNT",
        selector: (row) =>`${row.total_price} (${row.payment_method})`,
    },
    {
        name: "STATUS",
        selector: (row)=>row.order_status,
    },
    {
        name: "PARTNER ID",
        selector: ""
    },
    {
        name: "REVIEW",
        selector: ""
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
        <div className="hide-scrollbar rounded-md gap-5  border-[1px] border-green-600 overscroll-x-contain ">
            {/* {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>} */}
            <DataTable

                columns={columns}
                data={filteredOrderHistoryData.length > 0 ? filteredOrderHistoryData : []} 
                noDataComponent={<div className="text-gray-500 text-center py-4">No orders found</div>} 
                highlightOnHover
                // fixedHeader
                striped
                customStyles={customStyles}
            />

    </div>
  )
}

export default OrderHistoryTable
