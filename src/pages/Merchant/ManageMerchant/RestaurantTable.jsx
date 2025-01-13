import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from "react-redux";
import eye from '../../../assets/images/eye.svg';
import { useEffect } from 'react';
import { fetchMerchantListOnboarding, selectMerchantListOnboarding, selectMerchantError, selectMerchantLoading } from '../../../redux/slices/merchant';
import { getMenuByRestaurant, selectMenuCategory } from '../../../redux/slices/restaurant'
import addon from '../../../assets/images/addonview.svg';
import { ReceiptSwissFranc } from 'lucide-react';
import veg from '../../../assets/images/veg.svg';
import nonveg from '../../../assets/images/nonveg.svg';
import SearchBox from '../../../components/GeneralComponent/SearchBox/SearchBox';
import { getRestaurantById, selectSelectedRestaurant, selectApiError,selectApiLoading } from '../../../redux/slices/restaurant';



const RestaurantTable = ({ onboarding, searchTerm }) => {
  const dispatch = useDispatch()
  const merchants = useSelector(selectMerchantListOnboarding)
  const loading = useSelector(selectMerchantLoading)
  const error = useSelector(selectMerchantError)
  const [menuSearch , setMenuSearch] = useState('')
  
  
  
  
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
    const menuData =useSelector(selectMenuCategory)

  const handleMenuPopup = (row) => {
    const {restaurant_id :restaurantId} = row
    setSelectedRow(row)
    dispatch(getMenuByRestaurant(restaurantId))
    // dispatch(getRestaurantById(restaurantId))
    setPopupOpen(true)
    console.log('menudataxa',menuData)
    

  }
  useEffect(() => {
    if (onboarding) {
      dispatch(fetchMerchantListOnboarding({ onboarding }))

    }
    
  }, [onboarding, dispatch]);

  const filteredMerchants = searchTerm ? merchants.filter((merchant) =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase())) : merchants;

  const filteredItems = menuSearch
  ? menuData[0]?.items?.filter((item) =>
      item.item_name.toLowerCase().includes(menuSearch.toLowerCase())
    )
  : menuData[0]?.items || [];
  
  const handleSearch =(term)=>{
    setMenuSearch(term);
  }

  const columns = [
    {
      name: "SHOPNAME",
      selector: (row) => (<div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={row.image}
          alt={row.logo}
          style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
        />
        {row.name}
      </div>)

    },
    {
      name: "PHONE NUMBER",
      selector: (row) => row.primary_phone,
    },
    {
      name: "STATUS",
      selector: (row) => (row.is_online ? "Online" : "Offline"),
    },
    // {name:"ORDERS",
    //   selector:(row) =>row.
    // },
    // {
    //   nme:"TOTAL AMOUNT",
    //   selector:(row)=>row.
    // },
    // {
    //   name:"REVENUE",
    //   selector:(row)=>row.
    // },
    // {name:"PAID",
    //   selector:(row)=>row.
    // },
    // {
    //   name:"BALANCE",
    //   selector:(row)=>row.balance,
    // },
    {
      name: "MENU CATEGORY",
      selector: (row) => (
        <div
          style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100%",
          }}
        >
          <img
            src={eye} alt="menu" style={{ cursor: "pointer", width: "18px", height: "18px" }}
            onClick={() => handleMenuPopup(row)}
          />
        </div>
      ),
    },
      {name:"GSTIN",
        selector:(row) => row.city,
      },
      {name:"FSSI",
        selector:(row) => row.city,
      },
    {
      name: "CITY",
      selector: (row) => row.city,
    },
    {
      name: "ADDRESS",
      selector: (row) => `${row.street_address_1},${row.street_address_2}`,
      wrap: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },


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
     

    <div className="hide-scrollbar rounded-md gap-5 w-3/4 border-[1px] border-green-600 ml-5">
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

    {isPopupOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      className="popup"
      style={{
        backgroundColor: "#FAFAFA",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "70%",
        maxHeight: "70%",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        zIndex: 1001,
       
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          marginBottom: "20px",
        }}
      >
        {/* Heading */}
        <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>MENU</h3>

        {/* Labels Row */}
        <div style={{ display: "flex", gap: "10px", flexGrow: 1, marginLeft: "20px" }}>
          {menuData?.map((menu,index) => (
            <span
              key={menu.id || index}
              style={{
                padding: "5px 15px",
                borderRadius: "20px",
                border: "1px solid grey",
                cursor: "pointer",
                backgroundColor: "#fff",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "orange")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
              onClick={(e) => (e.target.style.backgroundColor = "orange")}
            >
              {menu.menu_title}
            </span>
          ))}
        </div>

        {/* Search Box */}
        {/* <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            outline: "none",
          }}
        /> */}
        <SearchBox onSearch={handleSearch}/>
      </div>

      {/* Table */}
      <div style={{ padding: "10px" }}>
  <DataTable
    columns={[
      {
        name: "ITEM NAME",
        selector: (row) => row.item_name,
        sortable: true,
        style: { width: "100px" }, // Set fixed width
      },
      {
        name: "TYPE",
        selector: (row) => {
          const imageSrc = row.item_type === "Veg" ? veg : nonveg; 
      
          return <img src={imageSrc} alt={row.item_type} style={{ width: "20px", height: "20px" }} />;
        },
        sortable: true,
        style: { width: "100px" }, // Set fixed width
      },
      {
        name: "DESCRIPTION",
        selector: (row) => row.description,
        style: { width: "100px" }, // Set fixed width
      },
      {
        name: "IMAGE",
        selector: (row) => (
          <img src={row.image} alt="Item" style={{ width: "30px", height: "30px" }} />
        ),
        style: { width: "30px" }, // Set fixed width
      },
      {
        name: "COOKING TIME",
        selector: (row) => row.preparation_time,
        style: { width: "100px" }, // Set fixed width
      },
      {
        name: "ADDONS",
        selector: (row) => (
          <div
            style={{
              display: "flex", justifyContent: "center", alignItems: "center", height: "100%",
            }}
          >
            <img
              src={addon} alt="menu" style={{ cursor: "pointer", width: "18px", height: "18px" }}
              // onClick={() => handleMenuPopup(row)}
            />
          </div>
        ),
      },
      {
        name: "QTY",
        selector: (row) => row.quantity,
        style: { width: "100px" }, // Set fixed width
      },

      {
        name: "BASE",
        selector: (row) => row.base_price,
        style: { width: "100px" }, // Set fixed width
      },
      {
        name: "SELLING PRICE",
        selector: (row) => row.selling_price,
        style: { width: "100px" }, // Set fixed width
      },
      {
        name: "C.P%",
        selector: (row) => row.selling_price,
        style: { width: "100px" }, // Set fixed width
      },
    ]}
    data={filteredItems|| []}  // Pass your row data here
    pagination
    highlightOnHover
        fixedHeader
        striped
        customStyles={customStyles}

    style={{ width: "100%" }} // Set the overall table width
  />
</div>

      {/* Close Button */}
      <button
        onClick={() => setPopupOpen(false)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          backgroundColor: "orange",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

    </>
  )
}

export default RestaurantTable


