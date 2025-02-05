import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderHistory, selectAllOrderHistory, selectError,selectLoading } from '../../../../redux/slices/ordersHistory';
const OrderHistoryTable = () => {
    const dispatch = useDispatch()
    const orderHistoryData = useSelector(selectAllOrderHistory)
    



    useEffect(()=>{
        dispatch(getAllOrderHistory())
    },[dispatch])

    const columns = [{
        name: "DATE",
        selector: (row)=>row.created_at,
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
        selector: ""
    },
    {
        name: "STATUS",
        selector: ""
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
                data={orderHistoryData}
                highlightOnHover
                // fixedHeader
                striped
                customStyles={customStyles}
            />

    </div>
  )
}

export default OrderHistoryTable
