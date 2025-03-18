import React from "react";
import DataTable from "react-data-table-component";
import salariedData from "./SalariedList";

const SalariedTable = ({ columns, data }) => {
  // const customStyles = {
  //   rows: {
  //     style: (row) => ({
  //       height: "56px",
  //       // override the row height
  //       backgroundColor: row.status === "OFFLINE" ? "#989898" : "#FFFFFF", // Apply background color based on status
  //     }),
  //   },
  //   headCells: {
  //     style: {
  //       backgroundColor: "#F0F8FF",
  //       color: "#A3A3A3",
  //       fontWeight: 700,
  //       Height: "60px",
  //     },
  //   },
  //   cells: {
  //     style: {},
  //   },
  // };

  return (
    <div className="hide-scrollbar rounded-md gap-5 w-full border-[1px] border-green-600 ">
      <DataTable
        columns={columns}
        data={data}
        highlightOnHover
        striped
        pagination
        paginationPerPage={20}
        // fixedHeader
      />
    </div>
  );
};

export default SalariedTable;
