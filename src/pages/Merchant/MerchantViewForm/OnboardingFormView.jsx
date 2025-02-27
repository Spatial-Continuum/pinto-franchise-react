import React, { useState, useEffect } from "react";
// Import necessary components and styles
import RestaurantInfoView from "./RestaurantInfoView";
import UploadingImageView from "./UploadingImageView";
import TypeTimingsView from "./TypeTimingsView";
import editIcon from "../../../assets/images/editicons.svg";
import MainLayout from "../../../components/GeneralComponent/Layout/MainLayout";
import tick from "../../../assets/images/tick.svg";
import {
  updateRestaurantDetails,
  getRestaurantById,
  selectUpdatedRestaurant,
  selectSelectedRestaurant,
} from "../../../redux/slices/restaurant";
import "../../../assets/styles/progressNavbar.css";
import { useSelector, useDispatch } from "react-redux";
import roundTick from "../../../assets/images/roundTick.svg";
import {
  postNewRestaurant,
  selectApiError,
  selectApiLoading,
} from "../../../redux/slices/restaurant";
import PdfComp from "../../../PdfComp";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import RestaurantService from "../../../modules/restaurants/RestaurantService";

const OnboardingFormView = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const updateRestaurant = useSelector(selectUpdatedRestaurant);
  const restaurantDetails = useSelector(selectSelectedRestaurant);
  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);
  const [extraStore, setExtraStore] = useState("");
  const [extraCuisine, setExtraCuisine] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [popupMessage, setPopupMessage] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  // const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    image: "",
    logo: "",
    gstin: "",
    owner: null,
    fassai: null,
    state: "",
    door_no: "",
    street_address_1: "",
    street_address_2: "",
    city: "",
    pincode: "",
    otherCuisine: "",
    otherStore: "",
    landmark: "",
    primary_phone: "",
    secondary_phone: "",
    email: "",
    opening_hours: {
      // Monday: "",
      // Tuesday: "",
      // Wednesday: "",
      // Thursday: "",
      // Friday: "",
      // Saturday: "",
      // Sunday: "",
    },
    cuisine_type: [],
    restaurant_category: [],
    merchant_type: [],
    latitude: null,
    longitude: null,
    commission_percentage: "",
    owner_details: [],
  });
  console.log("forming data", formData);
  useEffect(() => {
    // Fetch restaurant details on component mount
    dispatch(getRestaurantById(restaurantId));
  }, [dispatch]);

  useEffect(() => {
    if (restaurantDetails) {
      setFormData({
        name: restaurantDetails.name || "",
        short_description: restaurantDetails.short_description || "",
        image: restaurantDetails.image || "",
        logo: restaurantDetails.logo || "",
        gstin: restaurantDetails.gstin || null,
        owner: restaurantDetails.owner || null,
        fassai: restaurantDetails.fassai || null,
        state: restaurantDetails.state || null,
        door_no: restaurantDetails.door_no || "",
        street_address_1: restaurantDetails.street_address_1 || "",
        street_address_2: restaurantDetails.street_address_2 || "",
        city: restaurantDetails.city || "",
        pincode: restaurantDetails.pincode || "",
        landmark: restaurantDetails.landmark || "",
        primary_phone: restaurantDetails.primary_phone || "",
        secondary_phone: restaurantDetails.secondary_phone || "",
        email: restaurantDetails.email || "",
        opening_hours: restaurantDetails.opening_hours || {},
        cuisine_type: restaurantDetails.cuisine_type || [],
        restaurant_category: restaurantDetails.restaurant_category || [],
        merchant_type: restaurantDetails.merchant_type || [],
        latitude: restaurantDetails.latitude || null,
        longitude: restaurantDetails.longitude || null,
        commission_percentage: restaurantDetails.commission_percentage || "",
        owner_details: restaurantDetails.owner_details || [],
      });
    }
    console.log("detailsda", restaurantDetails);
  }, [restaurantDetails]);

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps((prev) => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep];
        }
        return prev;
      });
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFormDataChange = (newData, step) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: newData,
    }));
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.name) {
        setPopupMessage("Please fill in the restaurant name.");
        setShowPopup(true);
        return false;
      }
      if (!formData.city) {
        setPopupMessage("Please fill in the city.");
        setShowPopup(true);
        return false;
      }
      if (!formData.pincode) {
        setPopupMessage("Please fill in the pincode.");
        setShowPopup(true);
        return false;
      }
      if (!formData.primary_phone) {
        setPopupMessage("Please fill in the primary phone number.");
        setShowPopup(true);
        return false;
      }
      if (!formData.secondary_phone) {
        setPopupMessage("Please fill in the secondary phone number.");
        setShowPopup(true);
        return false;
      }
      if (!/^\d{10}$/.test(formData.secondary_phone)) {
        setPopupMessage("Primary phone number must be exactly 10 digits.");
        setShowPopup(true);
        return false;
      }

      if (!/^\d{10}$/.test(formData.primary_phone)) {
        setPopupMessage("Primary phone number must be exactly 10 digits.");
        setShowPopup(true);
        return false;
      }

      if (!formData.email) {
        setPopupMessage("Please fill in the email address.");
        setShowPopup(true);
        return false;
      }
      if (!formData.landmark) {
        setPopupMessage("Please fill in the landmark.");
        setShowPopup(true);
        return false;
      }

      if (!formData.gstin) {
        setPopupMessage("Please fill in the GSTIN.");
        setShowPopup(true);
        return false;
      }
      if (formData.gstin.length !== 15) {
        setPopupMessage("GSTIN must be exactly 15 characters long.");
        setShowPopup(true);
        return false;
      }
    }
    if (step === 2) {
      if (!formData.restaurant_category) {
        setPopupMessage("Please select the restaurant category.");
        setShowPopup(true);
        return false;
      }
      if (!formData.cuisine_type.length === 0) {
        setPopupMessage("Please select at least one cuisine type.");
        setShowPopup(true);
        return false;
      }
      if (!formData.short_description) {
        setPopupMessage("Please fill in the short description.");
        setShowPopup(true);
        return false;
      }

      if (!formData.opening_hours) {
        setPopupMessage("Please select opening hours");
        setShowPopup(true);
        return false;
      }

      if (formData.merchant_type.length === 0) {
        setPopupMessage("Please select at least one merchant type.");
        setShowPopup(true);
        return false;
      }
    }

    return true;
  };
  const extractErrorMessage = (error) => {
    if (typeof error === "string") {
      // If the error is a string, return it directly
      return error;
    }

    if (error?.detail) {
      // Handle cases where the error has a 'detail' key
      return error.detail;
    }

    if (error?.non_field_errors) {
      // Handle cases where the error has a 'non_field_errors' key
      return error.non_field_errors[0];
    }

    // Handle nested field errors (e.g., owner, email, etc.)
    for (const key in error) {
      if (Array.isArray(error[key]) && error[key].length > 0) {
        return error[key][0]; // Return the first error message for the field
      }
    }

    // Fallback message if no error message is found
    return "An error occurred while submitting the form.";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("siehīhwikehw", formData);
    const dataToSubmit = new FormData();
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("short_description", formData.short_description);
    dataToSubmit.append("door_no", formData.door_no);
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("street_address_1", formData.street_address_1);
    dataToSubmit.append("street_address_2", formData.street_address_2);
    dataToSubmit.append("gstin", formData.gstin);
    dataToSubmit.append(
      "commission_percentage",
      formData.commission_percentage
    );
    dataToSubmit.append("city", formData.city);
    dataToSubmit.append("pincode", formData.pincode);
    dataToSubmit.append("landmark", formData.landmark);
    dataToSubmit.append("primary_phone", formData.primary_phone);
    dataToSubmit.append("secondary_phone", formData.secondary_phone);
    dataToSubmit.append("latitude", formData.latitude);
    dataToSubmit.append("longitude", formData.longitude);
    dataToSubmit.append("restaurant_category", formData.restaurant_category);

    let merchantTypes = [...formData.merchant_type];
    if (formData.customStore) {
      merchantTypes.push(formData.customStore);
    }
    let cuisineTypes = [...formData.cuisine_type];
    if (formData.customCuisine) {
      cuisineTypes.push(formData.customCuisine);
    }

    console.log("merchanttypesda", merchantTypes);
    dataToSubmit.append("merchant_type", JSON.stringify(merchantTypes));
    dataToSubmit.append("cuisine_type", JSON.stringify(cuisineTypes));
    dataToSubmit.append(
      "opening_hours",
      JSON.stringify(formData.opening_hours)
    );
    if (formData.image instanceof File) {
      dataToSubmit.append("image", formData.image);
    }
    if (formData.fassai) {
      dataToSubmit.append("fassai", formData.fassai);
    }
    if (formData.logo instanceof File) {
      dataToSubmit.append("logo", formData.logo);
    }
    for (const [key, value] of dataToSubmit.entries()) {
      console.log(`${key}: ${value}`);
    }
    // try {
    //   // Dispatch the async thunk to update the restaurant details
    //   await dispatch(updateRestaurantDetails(restaurantId, dataToSubmit)).unwrap();
    //   // Optionally, handle success (e.g., show a modal or success message)
    // } catch (error) {
    //   // Handle error if the update fails
    //   console.error('Error submitting form:', error);
    // }

    try {
      const response = await RestaurantService.updateRestaurant(
        restaurantId,
        dataToSubmit
      );
      console.log("Restaurant updated", response);
      setModalVisible(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMsg = extractErrorMessage(error);
      setErrorMessage(errorMsg); // Set the error message

      setErrorPopup(true);
    }
  };

  return (
    <MainLayout>
      <div className="mb-36">
        {/* Progress Navbar */}
        <div className="flex justify-between ">
          <div className="progress-navbar flex gap-6 mx-5 my-4 relative">
            <hr className="absolute top-8 left-0 w-2/4  border-[#E6E6E6] border-[1px]" />
            <div
              className={`step-heading relative cursor-pointer text-lg ${
                currentStep === 1
                  ? "active"
                  : completedSteps.includes(1)
                  ? "completed"
                  : ""
              }`}
              onClick={() => setCurrentStep(1)}
            >
              Restaurant Info
              <img
                src={editIcon}
                alt="Edit"
                className="w-4 h-4 cursor-pointer"
                onClick={() => setIsEditable(true)}
              />
              {completedSteps.includes(1) && (
                <span>
                  {" "}
                  <img src={roundTick} alt="Completed" />
                </span>
              )}
              {/* Dynamic Underline for Step 1 */}
              <div
                className={`underline-offset-8  h-1 rounded-xl bg-orange-500 transition-all duration-300 ${
                  currentStep === 1 ||
                  (completedSteps.includes(1) && currentStep !== 1)
                    ? "w-full"
                    : "w-0"
                }`}
              ></div>
            </div>

            {/* Step 2: Restaurant Type & Timings */}
            <div
              className={`step-heading relative cursor-pointer text-lg ${
                currentStep === 2
                  ? "active"
                  : completedSteps.includes(2)
                  ? "completed"
                  : ""
              }`}
              onClick={() => setCurrentStep(2)}
            >
              Restaurant Type & Timings
              <img
                src={editIcon}
                alt="Edit"
                className="w-4 h-4 cursor-pointer"
                onClick={() => setIsEditable(true)}
              />
              {completedSteps.includes(2) && (
                <img src={roundTick} alt="Completed" />
              )}
              {/* Dynamic Underline for Step 2 */}
              <div
                className={`underline-offset-8  h-1 rounded-xl bg-orange-500 transition-all duration-300 ${
                  currentStep === 2 || completedSteps.includes(2)
                    ? "w-full"
                    : "w-0"
                }`}
              ></div>
            </div>

            {/* Step 3: Upload Image */}
            <div
              className={`step-heading relative cursor-pointer  text-lg ${
                currentStep === 3
                  ? "active"
                  : completedSteps.includes(3)
                  ? "completed"
                  : ""
              }`}
              onClick={() => setCurrentStep(3)}
            >
              Upload Image
              <img
                src={editIcon}
                alt="Edit"
                className="w-4 h-4 cursor-pointer"
                onClick={() => setIsEditable(true)}
              />
              {completedSteps.includes(3) && (
                <img src={roundTick} alt="Completed" />
              )}
              {/* Dynamic Underline for Step 3 */}
              <div
                className={` underline-offset-8  h-1 rounded-xl bg-orange-500 transition-all duration-300 ${
                  currentStep === 3 || completedSteps.includes(3)
                    ? "w-full"
                    : "w-0"
                }`}
              ></div>
            </div>
          </div>
          {isEditable && (
            <div className="flex flex-row justify-end my-4 gap-2 ">
              <div>
                <button
                  onClick={() => setIsEditable(false)}
                  className="w-32 h-8 rounded-lg border-[1px] border-[#4A4E56] bg-[#ADADAD] bg-opacity-15 text-[#4A4E56] transition-all duration-300 "
                >
                  cancel
                </button>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-32 h-8 rounded-lg border-[1px] border-[#008BFF] bg-[#008BFF] text-[#FFFFFF] transition-all duration-300 "
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        {currentStep === 1 && (
          <RestaurantInfoView
            formData={formData}
            isEditable={isEditable}
            onDataChange={setFormData}
          />
        )}

        {currentStep === 2 && (
          <TypeTimingsView
            formData={formData}
            ExtraCuisine={extraCuisine}
            ExtraStore={extraStore}
            isEditable={isEditable}
            onDataChange={setFormData}
          />
        )}

        {currentStep === 3 && (
          <UploadingImageView
            formData={formData}
            isEditable={isEditable}
            onDataChange={setFormData}
          />
        )}

        <div>
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="w-32 h-8 rounded-lg border-[1px] border-[#030714] bg-[#FAFAFA] mr-5 mx-5"
            >
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className="w-32 h-8 text-white rounded-lg border-[1px] border-[#004680] bg-[#004680] mx-5"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-32 h-8 text-white rounded-lg border-[1px] border-[#004680] bg-[#004680]"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[470px] h-[378px] rounded-lg p-6">
            <img
              src={tick}
              alt="Tick"
              className="w-24 h-11 mx-auto mt-20 mb-6"
            />
            <h2 className="text-center text-2xl font-semibold mb-4">
              Restaurant Details Edited and Updated
            </h2>
            <p className="text-center text-sm mb-4">
              Our team will verify the details and reach you shortly!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setModalVisible(false);
                  navigate("/merchant/onboarding"); // Example route
                }}
                className="w-32 h-8 text-white bg-[#004680] rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[320px] h-[160px] rounded-lg p-6">
            <h2 className="text-center text-xl font-semibold mb-4">
              Error Occurred
            </h2>
            <p>{popupMessage}</p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="w-32 h-8 text-white bg-[#004680] rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {errorPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] h-[200px] rounded-lg p-6">
            <h2 className="text-center text-xl font-semibold mb-4">
              Error Occurred
            </h2>
            <p>{errorMessage}</p>
            <button
              onClick={() => setErrorPopup(false)}
              className="w-32 h-8 text-white bg-[#004680] rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default OnboardingFormView;
