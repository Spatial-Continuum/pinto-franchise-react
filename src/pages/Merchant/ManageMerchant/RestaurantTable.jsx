import React, { useState, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from "react-redux";
import eye from '../../../assets/images/eye.svg';
import { useEffect } from 'react';
import { fetchMerchantListOnboarding, selectMerchantListOnboarding, selectMerchantError, selectMerchantLoading } from '../../../redux/slices/merchant';
import { getMenuByRestaurant, selectMenuCategory } from '../../../redux/slices/restaurant'
import addon from '../../../assets/images/addonview.svg';
import { ReceiptSwissFranc } from 'lucide-react';
import UseOnClickOutside from '../../../components/GeneralComponent/Dropdown/UseOnClickOutside';
import veg from '../../../assets/images/vegicon.svg';
import edit from '../../../assets/images/edit.svg';
import nonveg from '../../../assets/images/nonvegicon.svg';
import search from '../../../assets/images/prime_search.svg';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../../../components/GeneralComponent/SearchBox/SearchBox';
import { getRestaurantById, selectSelectedRestaurant, selectApiError, selectApiLoading } from '../../../redux/slices/restaurant';
import { Button } from 'antd';
import PdfView from '../../../components/GeneralComponent/PdfView/PdfView';



const RestaurantTable = ({ onboarding, searchTerm }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const merchants = useSelector(selectMerchantListOnboarding)
  const loading = useSelector(selectMerchantLoading)
  const error = useSelector(selectMerchantError)
  const [menuSearch, setMenuSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null);
  const [addressPopupData, setAddressPopupData] = useState(null)
  const [modalContent, setModalContent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const popupRef = useRef(); // Define ref for the popup
  UseOnClickOutside(popupRef, () => setPopupOpen(false));

  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [addressPopup, setAddressPopup] = useState(false);
  const menuData = useSelector(selectMenuCategory)
  const [allItems, setAllItems] = useState([])
  const [selectedMenuTitle, setSelectedMenuTitle] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const handleMenuPopup = (row) => {
    const { restaurant_id: restaurantId } = row

    setSelectedMerchant(restaurantId)
    dispatch(getMenuByRestaurant(restaurantId))
    // dispatch(getRestaurantById(restaurantId))
    setPopupOpen(true)
    console.log('menudataxa', menuData)


  }
  const handleEdit = (id) => {

    navigate(`/menu/restaurant-item/addmenu/${id}`)
    console.log('editdata', row)
  }
  const handleAddressPopup = (row) => {
    setAddressPopup(true)
    console.log('address data', row)
    setAddressPopupData(row)
  }
  useEffect(() => {
    if (onboarding) {
      dispatch(fetchMerchantListOnboarding({ onboarding }))

    }

  }, [onboarding, dispatch]);
  const handlePdfView = (fassai) => {
    setModalContent(<PdfView selectedFile={fassai} />);
    setModalVisible(true);
  };

  const handleShopNameClick = (restaurantId) => {
    console.log('shop name clicked', restaurantId)
    navigate(`/onboarding-form-view/${restaurantId}`);

  }

  useEffect(() => {
    const searchLower = menuSearch.toLowerCase();
    const items = [];

    menuData.forEach((doc) => {
      const documentItems = doc?.items || [];
      documentItems.forEach((item) => {
        if (item.item_name.toLowerCase().includes(searchLower)) {
          items.push(item);
        }
      });
    });
    setAllItems(items);
    setFilteredItems(items);
  }, [menuSearch, menuData]);



  const filteredMerchants = searchTerm ? merchants.filter((merchant) =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase())) : merchants;

  console.log('menuddetails', menuData)

  const handleMenuClick = (menuTitle) => {
    setSelectedMenuTitle(menuTitle);
    setSelectedItem(menuTitle);
    if (menuTitle !== 'All') {
      const items = [];

      menuData.forEach((doc) => {
        if (doc.menu_title === menuTitle) {
          const documentItems = doc?.items || [];
          documentItems.forEach((item) => {
            items.push(item);
          });
        }
      });

      setFilteredItems(items);
    } else {
      setFilteredItems(allItems);
    }
  };


  const filteredData = selectedMenuTitle !== 'All' ? filteredItems : allItems;

  const handleSearch = (term) => {
    setMenuSearch(term);
  }
  const getCurrentDayHours = (openingHours) => {
    const daysOfWeek = [

      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"



    ];
    const currentDay = new Date().getDay();
    const currentDayName = daysOfWeek[currentDay];
    const CurrentDayHours = openingHours[currentDayName] || "Hours not available";
    return `${CurrentDayHours} (${currentDayName})`;
  };
  const columns = [
    {
      name: "SHOPNAME",
      width:"200px",
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" ,Width:"100px" }}>
          <img
            src={row.logo}
            alt={row.image}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "10px",
              objectFit: "cover",
            }}
          />
          <button
            onClick={() => handleShopNameClick(row.restaurant_id)}


          >
            {row.name}
          </button>
        </div>
      ),
    },
    
    {
      name: "ADDRESS",
      width:"100px",
      
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

      wrap: true,
    },
    {
      name: "PHONE NUMBER",
      selector: (row) => row.primary_phone,
    },
    {
      name: "STATUS",
      selector: (row) => (
        <span style={{ color: row.is_online ? "#008B0E" : "#FF6B00", fontWeight: 'bold' }}>
          {row.is_online ? "ONLINE" : "OFFLINE"}
        </span>),
    },
    {name:"ORDERS",
      selector:(row) =>""
    },
  
    {
      name:"REVENUE",
      selector:(row)=>""
    },
    {name:"PAID",
      selector:(row)=>""
    },
    {
      name:"BALANCE",
      selector:(row)=>""
    },
    {
      name: "MENU ITEMS",
      width:"120px",
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
    {
      name: "GSTIN",
      selector: (row) => row.gstin,
    },
    {
      name: "FASSAI",
      width:"100px",
      selector: (row) => (
        <div
          style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100%",
          }}
        >
          <img
            src={addon} alt="menu" style={{ cursor: "pointer", width: "18px", height: "18px" }}
            onClick={() => handlePdfView(row.fassai)}

          />
        </div>
      ),
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


      <div className="hide-scrollbar rounded-md gap-5 w-full border-[1px] border-green-600 ">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <DataTable

          columns={columns}
          data={filteredMerchants}
          highlightOnHover
          // fixedHeader
          striped
          customStyles={customStyles}
        />
      </div>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-3/4 bg-white p-4 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setModalVisible(false)}
              className="absolute top-2 text-3xl right-2 text-gray-500 hover:text-gray-700"

            >
              &times;
            </button>

            {/* Your modal content here */}
            {modalContent}
          </div>
        </div>
      )}



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
            ref={popupRef}
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
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              {/* Heading */}
              <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>MENU</h3>

              {/* Labels Row */}
              <div style={{ display: "flex", gap: "10px", flexGrow: 1, marginLeft: "20px" }}>
                <span
                  key="all"
                  style={{
                    padding: "5px 15px",
                    borderRadius: "20px",
                    border: "1px solid grey",
                    cursor: "pointer",
                    backgroundColor: selectedItem === "All" ? "orange" : "#fff",
                    transition: "all 0.1s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "orange")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor =   selectedItem === menu.menu_title || selectedItem === 'All'? "orange" : "#fff")}
                  onClick={() => handleMenuClick("All")}
                >
                  All
                </span>
                {menuData?.map((menu, index) => (
                  <span
                    key={menu.id || index}
                    style={{
                      padding: "5px 15px",
                      borderRadius: "20px",
                      border: "1px solid grey",
                      cursor: "pointer",
                      backgroundColor: selectedItem === menu.menu_title ? "orange" : "#fff",
                      transition: "all 0.1s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "orange")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = selectedItem === menu.menu_title ? "orange" : "#fff")} 
                    // onClick={(e) => (e.target.style.backgroundColor = "orange")}
                    onClick={() => handleMenuClick(menu.menu_title)}
                  >
                    {menu.menu_title}
                  </span>
                ))}
              </div>

              <SearchBox onSearch={handleSearch} placeholder="search" img={search} />

              <Button
                onClick={() => handleEdit(selectedMerchant)}

                className='ml-2 px-7  border-[#DBEFFF] bg-[#F1F5F9] border-[1px] hover:text-[#FF6B00] text-[#030714]   font-medium '><img src={edit} /> Edit</Button>
            </div>

            {/* Table */}
            <div className=''>
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
                data={filteredData}  // Pass your row data here
                pagination
                highlightOnHover
                fixedHeader
                striped

                customStyles={customStyles}

                style={{ width: "100%" }} // Set the overall table width
              />
            </div>


          </div>
        </div>
      )}

      {addressPopup && addressPopupData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/6 ">

            <div className="flex items-center">

              <img
                src={addressPopupData.image}
                alt="Restaurant"
                className="w-16 h-16 rounded-full"
              />

              <div className="ml-4 flex-1">
                <h3 className="text-xl font-bold">{addressPopupData.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <span>{addressPopupData.primary_phone}&nbsp;-&nbsp;{addressPopupData.secondary_phone}</span>
                  <span className="ml-4">⏰ Timings :&nbsp;{getCurrentDayHours(addressPopupData.opening_hours)}</span>
                </div>
              </div>

              <button
                className="text-black hover:text-gray-900"
                onClick={() => setAddressPopup(false)}
              >
                ✖
              </button>
            </div>
            <div className='border-[1px] border-gray-300 rounded-lg mt-4'>
              <div className="  p-4">
                <h6 className="text-xl font-medium text-black mb-2">Shop Address</h6>
                <h4 className="text-sm  text-gray-700">{addressPopupData.street_address_1} ,{addressPopupData.street_address_2}</h4>
                <h4 className="text-sm  text-gray-700">{addressPopupData.landmark},</h4>
                <h4 className="text-sm text-gray-700">{addressPopupData.city} - {addressPopupData.pincode}</h4>

              </div>

              <div className="mt-4 p-4">
                <h4 className="text-xl font-bold text-black ">Location in Map</h4>
                <div className="mt-2 h-48 w-full bg-gray-200">

                  <img
                    src="map-image-url"
                    alt="Map"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </>
  )
}

export default RestaurantTable


