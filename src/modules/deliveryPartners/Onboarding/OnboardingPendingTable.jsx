// import OnboardingData from "./OnboardingList";
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import addon from '../../../assets/images/addonview.svg';
import { useDispatch, useSelector } from "react-redux";
import { fetchMerchantListOnboarding, selectMerchantListOnboarding, selectMerchantError, selectMerchantLoading } from "../../../redux/slices/merchant";
import updateRestaurantSuccess from '../../restaurants/RestaurantService';
import RestaurantService from '../../restaurants/RestaurantService';
import PdfView from '../../../components/GeneralComponent/PdfView/PdfView';
import { useNavigate } from 'react-router-dom';
const OnboardingPendingTable = ({ searchTerm }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false);
    const merchants = useSelector(selectMerchantListOnboarding);
    const [addressPopup, setAddressPopup] = useState(false)
    const [rejectionReason, setRejectionReason] = useState("")
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null)
    const [addressPopupData, setAddressPopupData] = useState(null)
    const [selectedRow, setSelectedRow] = useState(null)
    const [timingPopup, setTimingPopup] = useState(false)
    const [timingPopupData, setTimingPopupData] = useState({})
    const loading = useSelector(selectMerchantLoading);
    const [rejectReasonPopup, setRejectReasonPopup] = useState(false)
    const [modalContent, setModalContent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const error = useSelector(selectMerchantError);
    const [onboarding, setOnboarding] = useState('Pending')


    useEffect(() => {
        dispatch(fetchMerchantListOnboarding({ onboarding }));

    }, [onboarding, dispatch, refresh]);

    const filteredMerchants = searchTerm ? merchants.filter((merchant) =>
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase())) : merchants;

    const handleAddressPopup = (row) => {
        setAddressPopup(true)
        console.log('address data', row)
        setAddressPopupData(row)
    }

    const handleLaunch = async (restaurantId) => {
        console.log('KeyboardOffIcon', restaurantId)
        try {
            const response = await RestaurantService.updateRestaurantSuccess(restaurantId)
            console.log("Onboarding status updated successfully:", response);
            alert("Onboarding status updated to 'Success'!");
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("Error updating onboarding status:", error);
            alert("Failed to update onboarding status. Please try again.");
        }
    }
    const handleReject = async (restaurantId) => {

        setCurrentRestaurantId(restaurantId);
        setRejectReasonPopup(true)
        console.log("rejection reaason", rejectionReason)

    }
    const sumbitRejection = async () => {
        try {
            const response = await RestaurantService.updateRestaurantRejected(currentRestaurantId, rejectionReason)
            console.log("Rejected restaurant_id:", currentRestaurantId);
            console.log("Rejection Reason:", rejectionReason);
            console.log("Onboarding status updated successfully:", response);
            setRejectReasonPopup(false);
            setCurrentRestaurantId(null);
            setRejectionReason("");
            alert("Onboarding status updated to 'Rejected'!");
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("Error updating onboarding status:", error);
            alert("Failed to update onboarding status. Please try again.");
        }

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
    const handleOpenTimings = (opening_hours) => {
        setTimingPopup(true)
        setTimingPopupData(opening_hours)

    }
    const handlePdfView = (fassai) => {
        setModalContent(<PdfView selectedFile={fassai} />);
        setModalVisible(true);
    };
    const handleShopNameClick = (restaurantId) => {
        console.log('shop name clicked', restaurantId)
        navigate(`/onboarding-form-view/${restaurantId}`);

    }
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const columns = [{
        name: "SHOP NAME",
        width:"200px",
        cell: (row) => (
            <div style={{ display: "flex", alignItems: "center" }}>
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
        name: "GSTIN",
        selector: (row) => row.gstin
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
    {
        name: "PER%",
        width:"100px",
        selector: (row) => row.commission_percentage
    },
    {
        name: 'CATEGORY',
        width:"100px",
        selector: (row) => row.restaurant_category,
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
        width:"130px",
        selector: (row) => row.primary_phone,

    },
    {
        name: "EMAIL",
        width:"200px",
        selector: (row) => row.email,


    },
    {
        name: "TIMINGS",
        width:"100px",
        selector: (row) => (
            <div
                style={{
                    display: "flex", justifyContent: "center", alignItems: "center", height: "100%",
                }}
            >
                <img
                    src={addon} alt="menu" style={{ cursor: "pointer", width: "18px", height: "18px" }}
                    onClick={() => handleOpenTimings(row.opening_hours)}


                />
            </div>
        ),

        wrap: true,
    },
    {
        name: "OWNER",
        selector: (row) => row.owner_details.name,
    },
    {
        name: "ACTION",
        width:"200px",

        cell: (row) => (
            <div className='flex flex-row'>
                <button
                    style={{
                        marginRight: "8px",
                        backgroundColor: "#F9DFDF",
                        color: "red",
                        border: "1px solid red",
                        padding: "5px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    onClick={() =>  handleReject(row.restaurant_id)}
                >
                    Reject
                </button>
                <button
                    style={{
                        backgroundColor: "#D8EBDA",
                        color: "#00840D",
                        border: "1px solid green",
                        padding: "5px ",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    onClick={() => handleLaunch(row.restaurant_id)}
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
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                <DataTable

                    columns={columns}
                    data={filteredMerchants || "NIL"}
                    highlightOnHover
                    //fixedHeader
                    striped
                    customStyles={customStyles}
                />
            </div>
            {/* pdfview */}
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
                                    <span className="ml-4">⏰Timings :&nbsp;{getCurrentDayHours(addressPopupData.opening_hours)}</span>
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
                                <h4 className="text-sm  text-gray-700">{addressPopupData.street_address_1},{addressPopupData.street_address_2}</h4>
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

            {
                rejectReasonPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            {/* Heading */}
                            <h2 className="text-xl font-semibold mb-4">Rejecting the Applicant ?</h2>

                            {/* Description Input */}
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Rejecting Reason
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={rejectionReason}
                                rows="4"
                                placeholder="Enter rejection reason..."
                                onChange={(e) => setRejectionReason(e.target.value)}
                            ></textarea>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-4">
                                <button
                                    className="px-4 py-1 text-gray-700 border border-gray-400 rounded-md hover:bg-gray-100"
                                    onClick={() => setRejectReasonPopup(false)} // Close popup on cancel
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    onClick={sumbitRejection}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                timingPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                            {/* Heading */}
                            <button
                                className=" absolute top-2 right-2 text-black  text-4xl pr-5  "
                                onClick={() => setTimingPopup(false)}
                            >
                                &times;
                            </button>

                            <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>



                            {/* Opening Hours Table */}
                            <div className="grid grid-cols-1 gap-4">
                                {daysOfWeek.map((day) => (
                                    <div key={day} className={`flex justify-between ${timingPopupData[day] === "" ? "text-red-500" : "text-gray-800"}`}>
                                        <span className="font-medium">{day}</span>
                                        <span>{timingPopupData[day] === "" ? "Closed" : timingPopupData[day]}</span>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default OnboardingPendingTable
