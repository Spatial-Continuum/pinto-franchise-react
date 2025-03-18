import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { FaMobileAlt, FaPhoneAlt } from "react-icons/fa";

import {
  getAllOrderHistory,
  selectAllOrderHistory,
  selectError,
  selectLoading,
} from "../../../../redux/slices/ordersHistory";
const OrderHistoryTable = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const orderHistoryData = useSelector(selectAllOrderHistory);

  const filteredOrderHistoryData =
    !searchTerm || searchTerm.trim() === ""
      ? orderHistoryData
      : orderHistoryData?.filter((order) => {
          const formattedDate = format(
            new Date(order.created_at),
            "dd-MM-yyyy"
          ); // Format date
          return (
            order?.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) || // Match Order ID
            order?.restaurant_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) || // Match Restaurant
            formattedDate.includes(searchTerm) // Match Date
          );
        });
  console.log("kjspofjee", filteredOrderHistoryData);
  useEffect(() => {
    dispatch(getAllOrderHistory());
  }, [dispatch]);

  const columns = [
    {
      name: "DATE",
      width: "200px",
      selector: (row) => (
        <span>
          <span style={{ color: "gray" }}>
            {format(new Date(row.created_at), "dd-MM-yyyy")}
          </span>{" "}
          {format(new Date(row.created_at), "hh:mm a")}
        </span>
      ),
      sortable: true,
    },

    {
      name: "ORDER ID",
      selector: (row) => row?.order_code,
    },
    {
      name: "TYPE",
      selector: (row) => (
        <span
          style={{
            color: row.order_type === "APP" ? "green" : "purple",
            fontSize: "16px",
          }}
        >
          {row.order_type === "APP" ? <FaMobileAlt /> : <FaPhoneAlt />}
        </span>
      ),
    },
    {
      name: "RESTAURANT",
      selector: (row) => row?.restaurant?.name,
    },
    {
      name: "ADDRESS",
      selector: (row) => row?.address?.address_line_1,
    },

    {
      name: "PHONE",
      selector: (row) => row?.user?.phone,
    },
    {
      name: "CUSTOMER",
      selector: (row) => row?.user?.username,
    },

    {
      name: "AMOUNT",
      selector: (row) => (
        <>
          <span>{row.total_price}</span>
          <span> </span>
          <span
            style={{
              color:
                row.payment_method === "COD"
                  ? "deeppink"
                  : row.payment_method === "UPI"
                  ? "green"
                  : "brown",
            }}
          >
            {row.payment_method}
          </span>
        </>
      ),
      width: "150px",
    },
    {
      name: "STATUS",
      selector: (row) => (
        <span
          style={{
            border: `1px solid ${
              row.payment_status == "Pending"
                ? "skyblue"
                : row.payment_status == "Canceled"
                ? "red"
                : row.payment_status == "Paid"
                ? "green"
                : "pink"
            }`,
            backgroundColor:
              row.payment_status == "Pending"
                ? "skyblue"
                : row.payment_status == "Canceled"
                ? "red"
                : row.payment_status == "Paid"
                ? "green"
                : "pink",
            padding: "4px",
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          {row.payment_status}
        </span>
      ),
    },

    {
      name: "PHONE",
      selector: (row) => row?.user?.phone,
    },

    {
      name: "REVIEW",
      selector: "",
    },
  ];
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
        Height: "60px",
      },
    },
  };

  return (
    <div className="hide-scrollbar rounded-md gap-5  border-[1px] border-green-600 overscroll-x-contain ">
      {/* {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>} */}
      <DataTable
        columns={columns}
        data={
          filteredOrderHistoryData.length > 0 ? filteredOrderHistoryData : []
        }
        noDataComponent={
          <div className="text-gray-500 text-center py-4">No orders found</div>
        }
        highlightOnHover
        pagination
        paginationPerPage={20}
        // fixedHeader
        striped
        customStyles={customStyles}
      />
    </div>
  );
};

export default OrderHistoryTable;
