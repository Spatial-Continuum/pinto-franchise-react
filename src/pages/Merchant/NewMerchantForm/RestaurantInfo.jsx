import React, { useEffect, useState } from "react";
import RestaurantService from "../../../modules/restaurants/RestaurantService";
//import { set } from 'react-datepicker/dist/date_utils';
import { useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";
const RestaurantInfo = ({ formData, onDataChange }) => {
  const inputref = useRef(null);
  const [data, setData] = useState(formData);
  const [ownerDetail, setOwnerDetail] = useState();
  const [createUserPopup, setCreateUserPopup] = useState(false);
  const [message, setMessage] = useState(false);
  const [newOwnerDetails, setNewOwnerDetails] = useState();
  const mapContainerStyle = { width: "100%", height: "100%" };
  const defaultCenter = { lat: 28.7041, lng: 77.1025 };
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [newUserDetails, setNewUserDetails] = useState({
    username: "",
    email: "",
    phone: "",
    role: "restaurant_owner",
  });
  const [phoneNo, setPhoneNo] = useState("");
  const [ownerPopup, setOwnerPopup] = useState(false);
  const [serach_for_address, setSearchForAddress] = useState();
  const [validFields, setValidFields] = useState({
    name: true, // Assuming 'name' is a field
    pincode: true,
    search_for_address: true,
    street_address_1: true,
    street_address_2: true,
    landmark: true,
    city: true,
    state: true,
    primary_phone: true,
    secondary_phone: true,
    email: true,
    commission_percentage: true,
    gstin: true,
    owner_name: true,
    owner_phone: true,
    mobile_no: true,
  });

  useEffect(() => {
    setValidFields((prev) => ({
      ...prev,
      owner_phone: !!phoneNo,
    }));
  }, [phoneNo]);

  useEffect(() => {
    console.log("Form Data Updated: ", data);
    onDataChange(data);
  }, [data]);

  // get user details
  const handleOwnerSearch = async () => {
    if (!phoneNo) {
      setValidFields((prev) => ({ ...prev, owner_phone: false }));
      return;
    }

    try {
      const userData = await RestaurantService.getUserByPhone(phoneNo);

      if (userData) {
        setOwnerDetail(userData);
        setOwnerPopup(true);
        setData((prev) => ({ ...prev, owner: userData.user_id }));
        setCreateUserPopup(false);
      } else {
        setOwnerDetail(null);
        setOwnerPopup(false);
        setData((prev) => ({ ...prev, owner: null }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setOwnerDetail(false);
      setCreateUserPopup(true);
    }
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    // try{
    //     e.target.value >= 0
    // }
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    setValidFields((prevState) => ({
      ...prevState,
      [name]: value.trim() !== "", // Mark as invalid if the field is empty
    }));
  };
  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setNewUserDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateUser = async () => {
    const userDetails = new FormData();
    userDetails.append("username", newUserDetails.username);
    userDetails.append("email", newUserDetails.email);
    userDetails.append("phone", newUserDetails.phone);
    userDetails.append("role", newUserDetails.role);

    for (const [key, value] of userDetails.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await RestaurantService.createUser(userDetails);
      console.log("User created successfully:", response.user.user_id);
      setOwnerDetail(response.user);
      setOwnerPopup(true);
      setData((prev) => ({ ...prev, owner: response.user.user_id }));
      setCreateUserPopup(false);
      setMessage(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyANMc42fXDaBF3bYBdHQFbWsquKht3arak",
    libraries: ["places"],
  });

  const handleOnPlaceChanged = () => {
    let places = inputref.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      console.log("hjgjyfkyufy", place);
      const address = place.formatted_address;
      console.log("klasdjfljwe", address);
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      console.log("kasjdfiojwoewe");
      let state = "";
      let locality = "";
      let sublocality = "";
      let pincode = "";
      let city = "";
      let street = "";
      place.address_components.forEach((com) => {
        console.log("klasjeoiwle", com);
      });
      place.address_components.forEach((component) => {
        if (component.types.includes("administrative_area_level_1")) {
          state = component.short_name; // State
        }
        if (component.types.includes("locality")) {
          locality = component.long_name; // City
        }

        if (component.types.includes("sublocality_level_1")) {
          sublocality = component.long_name;
        }
        if (component.types.includes("postal_code")) {
          pincode = component.long_name; // Pincode
        }
        if (component.types.includes("route")) {
          street = component.long_name; // Pincode
        }
        if (component.types.includes("administrative_area_level_3")) {
          city = component.long_name;
        }
      });
      let street1 = `${street},${sublocality}`;
      sublocality = `${locality},${sublocality}`;
      const updatedData = {
        ...data,
        search_for_address: address,
        latitude: lat,
        longitude: lng,
        state: state,
        city: city,
        pincode: pincode,
        street_address_2: street1,
        street: street,
        sublocality: sublocality,
      };
      console.log("kjasdhiwioew", updatedData);

      setData(updatedData);
      setMapCenter({ lat, lng });
      setMarkerPosition({ lat, lng });
      console.log("juieieioe", data);
      console.log("aisjiofwe", address);
    }
  };
  console.log("klsajdfoeopeop", data);
  return (
    <div className="p-6 ">
      <div className="flex justify-between ">
        <div className="w-4/6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Restaurant Name & Address
          </h2>
        </div>
        <div className="w-2/6 ">
          <h2 className="text-lg font-medium  text-gray-800 mb-4">
            Restaurant Location2
          </h2>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        {/* Left Box */}
        <div className="w-2/3 bg-gray-100 p-4 border border-gray-300 rounded-lg">
          {/* Restaurant Name */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="restaurantName"
              className="text-sm font-medium text-gray-700"
            >
              Restaurant Name
            </label>

            <input
              id="restaurantName"
              type="text"
              name="name"
              value={data.name}
              placeholder="Enter restaurant name"
              onChange={handleInputChange}
              className={`w-1/2 px-3 py-2 border ${
                validFields.name ? "border-gray-300" : "border-red-500"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {!validFields.name && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* Door Number */}
          <div className="w-3/6  flex flex-col mb-4">
            <label
              htmlFor="search for address"
              className="text-sm font-medium text-gray-700"
            >
              Search for Address
            </label>
            {isLoaded && (
              <StandaloneSearchBox
                onLoad={(ref) => (inputref.current = ref)}
                onPlacesChanged={handleOnPlaceChanged}
              >
                <input
                  id="search_for_address"
                  name="search_for_address"
                  value={data.search_for_address}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter search_for_address"
                  className={`w-full px-3 py-2 border ${
                    validFields.search_for_address
                      ? "border-gray-300"
                      : "border-red-500"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </StandaloneSearchBox>
            )}
          </div>
          {/*email*/}

          {/* Street Address 1 and 2 */}
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="streetAddress1"
                className="text-sm font-medium text-gray-700"
              >
                Street Address 1
              </label>

              <input
                id="streetAddress1"
                type="text"
                name="street_address_1"
                value={data.street_address_1 || ""}
                onChange={handleInputChange}
                placeholder="Enter street address 1"
                className={`w-full px-3 py-2 border ${
                  validFields.street_address_1
                    ? "border-gray-300"
                    : "border-red-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />

              {!validFields.street_address_1 && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="w-1/2">
              <label
                htmlFor="streetAddress2"
                className="text-sm font-medium text-gray-700"
              >
                Street Address 2
              </label>
              <input
                id="streetAddress2"
                type="text"
                name="street_address_2"
                value={data.street_address_2 || ""}
                onChange={handleInputChange}
                placeholder="Enter street address 2"
                className={`w-full px-3 py-2 border ${
                  validFields.street_address_2
                    ? "border-gray-300"
                    : "border-red-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!validFields.street_address_2 && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* City and Pincode */}
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                City
              </label>

              <input
                id="city"
                type="text"
                name="city"
                value={data.city || ""}
                onChange={handleInputChange}
                placeholder="Enter city"
                className={`w-full px-3 py-2 border ${
                  validFields.city ? "border-gray-300" : "border-red-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!validFields.city && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="w-1/2">
              <label
                htmlFor="pincode"
                className="text-sm font-medium text-gray-700"
              >
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                name="pincode"
                value={data.pincode || ""}
                onChange={handleInputChange}
                placeholder="Enter pincode"
                className={`w-full px-3 py-2 border ${
                  validFields.pincode ? "border-gray-300" : "border-red-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!validFields.pincode && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* Landmark */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="landmark"
              className="text-sm font-medium text-gray-700"
            >
              Landmark
            </label>
            <input
              id="landmark"
              name="landmark"
              value={data.landmark || ""}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter landmark"
              className={`w-full px-3 py-2 border ${
                validFields.landmark ? "border-gray-300" : "border-red-500"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {!validFields.landmark && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>
          {/*State */}
          <div className="flex flex-col mb-4 w-1/2">
            <label
              htmlFor="state"
              className="text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              id="state"
              name="state"
              value={data.state || ""}
              onChange={(e) => handleInputChange(e)}
              // disabled={!isEditable}
              type="text"
              placeholder="Enter state"
              className={`w-full px-3 py-2 border ${
                validFields.state ? "border-gray-300" : "border-red-500"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {!validFields.state && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>
        </div>

        {/* Right Box */}

        <div className="w-1/3 bg-gray-100 p-2 border border-gray-300 rounded-lg flex justify-center items-center shadow-lg hover:shadow-2xl ">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={14}
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          )}
        </div>
      </div>

      {/* Contact Numbers */}
      <h2 className="font-medium text-gray-800 mt-6">
        Contact Number of Restaurant
      </h2>
      <div className="w-2/3 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
        <div className="">
          <div className="flex gap-6 w-1/2  ">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="mobileNumber"
                className="text-sm text-gray-700 mb-1"
              >
                Primary Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="number"
                name="primary_phone"
                value={data.primary_phone || ""}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                maxLength="10"
                className={`px-3 py-2 border ${
                  validFields.primary_phone
                    ? "border-gray-300"
                    : "border-red-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!validFields.primary_phone && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="landlineNumber"
                className="text-sm text-gray-700 mb-1"
              >
                Secondary Mobile Number
              </label>
              <input
                id="SecondaryMobileNumber"
                name="secondary_phone"
                value={data.secondary_phone || ""}
                onChange={handleInputChange}
                maxLength="10"
                type="number"
                placeholder="Enter Secondary Mobile Number"
                className={`px-3 py-2 border ${
                  validFields.secondary_phone
                    ? "border-gray-300"
                    : "border-red-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!validFields.secondary_phone && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col w-1/2 mt-4 mb-4">
            <label
              htmlFor="email"
              className="text-sm font-sm text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={data.value}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter email address"
              className={`w-1/2 px-3 py-2 border ${
                validFields.email ? "border-gray-300" : "border-red-500"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {!validFields.email && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pinto Commission and GST Number */}
      <h2 className="font-medium text-gray-800 mt-6">
        Pinto Commission and GST Number
      </h2>

      <div className="w-2/3  flex flex-row gap-7 border-gray-300 rounded-lg mt-2">
        <div className="flex gap-6 w-2/10 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
          {/* Pinto Commission */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="commission_percentage"
              className="text-sm text-gray-700 mb-1"
            >
              Pinto Commission (%)
            </label>
            <input
              id="commission_percentage"
              type="number"
              name="commission_percentage"
              value={data.commission_percentage || ""}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter Pinto Commission"
              className={`px-3 py-2 border ${
                validFields.commission_percentage
                  ? "border-gray-300"
                  : "border-red-500"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {!validFields.commission_percentage && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>
        </div>

        {/* GST Number */}
        <div className="w-5/6 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
          <div className="flex flex-col w-3/6">
            <label htmlFor="gstin" className="text-sm text-gray-700 mb-1">
              GSTIN
            </label>
            <input
              id="gstin"
              type="text"
              name="gstin"
              value={data.gstin || ""}
              onChange={handleInputChange}
              maxLength="15"
              placeholder="Enter GSTIN"
              style={{ textTransform: "uppercase" }}
              className={`px-3 py-2 border ${
                validFields.gstin ? "border-gray-300" : "border-red-500"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {!validFields.gstin && (
              <span className="text-red-500 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Restaurant Owner Details */}
      <h2 className="font-medium text-gray-800 mt-6">
        Restaurant Owner Details
      </h2>
      <div className="w-2/3 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
        <div className="flex flex-row space-x-4 w-1/2 ">
          <div className="flex justify-start gap-0 w-full  ">
            <div className="flex flex-col w-full">
              <label>Mobile no</label>
              <input
                type="number"
                name="mobile_no"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className={`px-3 py-2 border ${
                  validFields.mobile_no ? "border-gray-300" : "border-red-500"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!validFields.mobile_no && (
                <span className="text-red-500 text-sm mt-1">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex w-1/2 items-center justify-center  mt-6">
              <button
                className="border-[1px] px-2        py-1 text-[#FFFFFF] bg-[#030714] rounded-md"
                onClick={handleOwnerSearch}
              >
                FIND USER
              </button>
            </div>
          </div>
        </div>
        {ownerPopup && ownerDetail ? (
          <div className="z-5  top-full left-0 w-96 bg-[#FFFFFF] border-1px rounded-lg border-[#d6cbcb] justify-center items-center z-50 mt-10">
            <div className="flex p-3 flex-col">
              <label className="text-green-600 mb-3 ">User Found!!</label>
              <div className="grid grid-cols-1">
                <div>
                  <label>Name : {ownerDetail.username}</label>
                </div>
                <div>
                  <label>Phone : {ownerDetail.phone}</label>
                </div>
                <div>
                  <label>Email : {ownerDetail.email}</label>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {createUserPopup ? (
          <div className="z-5 top-full left-0 w-4/6 bg-[#FFFFFF] border-1px rounded-lg border-[#d6cbcb] justify-center items-center z-50 mt-10">
            <div className="flex p-3 flex-col">
              <label className="text-red-600 mb-4">User Not Found!!</label>
              <div className="flex grid-cols-2 gap-5">
                {/* Owner Name Input */}
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Owner Name"
                    value={newUserDetails.username}
                    onChange={handleUserDetailsChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Mobile No Input */}
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Mobile No
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Mobile No"
                    maxLength="10"
                    value={newUserDetails.phone}
                    onChange={handleUserDetailsChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex grid-cols-2 gap-5">
                {/* Email Input */}
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Email Id
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={newUserDetails.email}
                    onChange={handleUserDetailsChange}
                    className="px-3 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  {/* <label className='text-sm font-medium text-gray-700'>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={newUserDetails.password}
                                    onChange={handleUserDetailsChange}
                                    className="px-3 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                /> */}
                </div>
              </div>
              {/* Create User Button */}
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg w-2/6 hover:bg-blue-700"
                onClick={handleCreateUser}
              >
                Create User
              </button>
            </div>
          </div>
        ) : null}
        {message && (
          <div className="left-0 w-4/6 justify-center items-center z-50">
            <p className="text-xs text-green-600 font-medium ">
              User created Successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;
