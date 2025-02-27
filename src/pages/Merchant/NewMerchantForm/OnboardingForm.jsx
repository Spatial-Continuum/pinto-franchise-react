import React, { useState } from "react";
// Import necessary components and styles
import RestaurantInfo from "../NewMerchantForm/RestaurantInfo";
import UploadingImage from "../NewMerchantForm/UploadingImage";
import RestaurantTypeTimings from "../NewMerchantForm/RestaurantTypeTimings";
import MainLayout from "../../../components/GeneralComponent/Layout/MainLayout";
import tick from "../../../assets/images/tick.svg";
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
import { Popover } from "antd";

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const dispatch = useDispatch();
  // const loading = useSelector(selectApiLoading);
  // const error = useSelector(selectApiError);
  const [errorMessage, setErrorMessage] = useState();
  const [extraStore, setExtraStore] = useState("");
  const [extraCuisine, setExtraCuisine] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaurantInfo: {
      name: "",
      search_for_address: "",
      latitude: "",
      longitude: "",
      // door_no: '',
      street_address_1: "",
      street_address_2: "",
      email: "",
      city: "",
      pincode: "",
      gstin: "",
      commission_percentage: "",
      landmark: "",
      state: "",
      primary_phone: "",
      secondary_phone: "",
      owner: "",
    },
    typeTimings: {
      restaurant_category: "",
      merchant_type: [],
      otherStore: "",
      otherCuisine: "",
      short_description: "",
      cuisine_type: [],
      opening_hours: {
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: "",
      },
    },
    image: {
      image: "",
      logo: "",
      fssaiCertificate: "",
    },
  });

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
    if (step === "typeTimings") {
      setExtraStore(newData.customStore);
      setExtraCuisine(newData.customCuisine);
      console.log("cuisineda:", extraCuisine);
    }
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.restaurantInfo.name) {
        setPopupMessage("Please fill in the restaurant name.");
        setShowPopup(true);
        return false;
      }
      if (!formData.restaurantInfo.city) {
        setPopupMessage("Please fill in the city.");
        setShowPopup(true);
        return false;
      }
      if (!formData.restaurantInfo.pincode) {
        setPopupMessage("Please fill in the pincode.");
        setShowPopup(true);
        return false;
      }
      if (!formData.restaurantInfo.primary_phone) {
        setPopupMessage("Please fill in the primary phone number.");
        setShowPopup(true);
        return false;
      }
      if (!formData.restaurantInfo.secondary_phone) {
        setPopupMessage("Please fill in the secondary phone number.");
        setShowPopup(true);
        return false;
      }
      if (!/^\d{10}$/.test(formData.restaurantInfo.secondary_phone)) {
        setPopupMessage("Primary phone number must be exactly 10 digits.");
        setShowPopup(true);
        return false;
      }

      if (!/^\d{10}$/.test(formData.restaurantInfo.primary_phone)) {
        setPopupMessage("Primary phone number must be exactly 10 digits.");
        setShowPopup(true);
        return false;
      }

      if (!formData.restaurantInfo.email) {
        setPopupMessage("Please fill in the email address.");
        setShowPopup(true);
        return false;
      }
      if (!formData.restaurantInfo.landmark) {
        setPopupMessage("Please fill in the landmark.");
        setShowPopup(true);
        return false;
      }

      if (!formData.restaurantInfo.gstin) {
        setPopupMessage("Please fill in the GSTIN.");
        setShowPopup(true);
        return false;
      }
      if (formData.restaurantInfo.gstin.length !== 15) {
        setPopupMessage("GSTIN must be exactly 15 characters long.");
        setShowPopup(true);
        return false;
      }
    }
    if (step === 2) {
      if (!formData.typeTimings.restaurant_category) {
        setPopupMessage("Please select the restaurant category.");
        setShowPopup(true);
        return false;
      }
      if (!formData.typeTimings.cuisine_type.length === 0) {
        setPopupMessage("Please select at least one cuisine type.");
        setShowPopup(true);
        return false;
      }
      if (!formData.typeTimings.short_description) {
        setPopupMessage("Please fill in the short description.");
        setShowPopup(true);
        return false;
      }

      if (!formData.typeTimings.opening_hours) {
        setPopupMessage("Please select opening hours");
        setShowPopup(true);
        return false;
      }

      if (formData.typeTimings.merchant_type.length === 0) {
        setPopupMessage("Please select at least one merchant type.");
        setShowPopup(true);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    const dataToSubmit = new FormData();

    console.log("alldata", formData);
    dataToSubmit.append("name", formData.restaurantInfo.name);
    dataToSubmit.append(
      "short_description",
      formData.typeTimings.short_description
    );
    dataToSubmit.append(
      "search_for_address",
      formData.restaurantInfo.search_for_address
    );
    //dataToSubmit.append('door_no', formData.restaurantInfo.door_no);
    dataToSubmit.append("email", formData.restaurantInfo.email);
    dataToSubmit.append(
      "street_address_1",
      formData.restaurantInfo.street_address_1
    );
    dataToSubmit.append(
      "street_address_2",
      formData.restaurantInfo.street_address_2
    );
    dataToSubmit.append("gstin", formData.restaurantInfo.gstin);
    dataToSubmit.append(
      "commission_percentage",
      formData.restaurantInfo.commission_percentage
    );
    dataToSubmit.append("city", formData.restaurantInfo.city);
    dataToSubmit.append("pincode", formData.restaurantInfo.pincode);
    dataToSubmit.append("landmark", formData.restaurantInfo.landmark);
    dataToSubmit.append("primary_phone", formData.restaurantInfo.primary_phone);
    dataToSubmit.append(
      "secondary_phone",
      formData.restaurantInfo.secondary_phone
    );
    dataToSubmit.append("email", formData.restaurantInfo.email);
    dataToSubmit.append("owner", formData.restaurantInfo.owner);
    dataToSubmit.append("state", formData.restaurantInfo.state);

    dataToSubmit.append(
      "restaurant_category",
      formData.typeTimings.restaurant_category
    );
    let merchantTypes = [...formData.typeTimings.merchant_type];
    if (extraStore) {
      merchantTypes.push(extraStore);
    }
    let cuisineTypes = [...formData.typeTimings.cuisine_type];
    if (extraCuisine) {
      cuisineTypes.push(extraCuisine);
    }

    console.log("merchanttypesda", merchantTypes);

    dataToSubmit.append("merchant_type", JSON.stringify(merchantTypes));
    dataToSubmit.append("cuisine_type", JSON.stringify(cuisineTypes));
    dataToSubmit.append(
      "opening_hours",
      JSON.stringify(formData.typeTimings.opening_hours)
    );

    const imagefrom = formData.image.image.image;
    const imagelogo = formData.image.image.logo;
    const fassai = formData.image.image.fssaiCertificate;
    if (imagefrom) {
      dataToSubmit.append("image", imagefrom);
    }
    if (imagelogo) {
      dataToSubmit.append("logo", imagelogo);
    }
    if (fassai) {
      dataToSubmit.append("fassai", fassai);
    }

    dataToSubmit.append("latitude", formData.restaurantInfo.latitude);
    dataToSubmit.append("longitude", formData.restaurantInfo.longitude);
    dataToSubmit.append("street", formData.restaurantInfo.street);
    dataToSubmit.append("sublocality", formData.restaurantInfo.sublocality);
    // console.log('Form Data submitted:', formData);
    for (const [key, value] of dataToSubmit.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`);
        console.log(`  File Name: ${value.name}`);
        console.log(`  File Type: ${value.type}`);
        console.log(`  File Size: ${value.size} bytes`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      await dispatch(postNewRestaurant(dataToSubmit)).unwrap();
      setModalVisible(true);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error submiting fomr", error);
      const errorMsg = extractErrorMessage(error);
      setErrorMessage(errorMsg); // Set the error message

      setErrorPopup(true);
    }
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

  return (
    <MainLayout>
      <div className="mb-36">
        {/* Progress Navbar */}
        <div className="progress-navbar flex gap-6 mx-5 my-4 relative">
          <hr className="absolute top-8 left-0 w-2/4 flex  border-[#E6E6E6] border-[1px]" />
          <div
            className={`step-heading relative cursor-pointer  text-xl ${
              currentStep === 1
                ? "active"
                : completedSteps.includes(1)
                ? "completed"
                : ""
            }`}
            onClick={() => setCurrentStep(1)}
          >
            Restaurant Info
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
            className={`step-heading relative cursor-pointer text-xl ${
              currentStep === 3
                ? "active"
                : completedSteps.includes(3)
                ? "completed"
                : ""
            }`}
            onClick={() => setCurrentStep(3)}
          >
            Upload Image
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

        {currentStep === 1 && (
          <RestaurantInfo
            formData={formData.restaurantInfo}
            onDataChange={(data) =>
              handleFormDataChange(data, "restaurantInfo")
            }
          />
        )}

        {currentStep === 2 && (
          <RestaurantTypeTimings
            formData={formData.typeTimings}
            ExtraCuisine={extraCuisine}
            ExtraStore={extraStore}
            onDataChange={(data) => handleFormDataChange(data, "typeTimings")}
          />
        )}

        {currentStep === 3 && (
          <UploadingImage
            formData={formData}
            onDataChange={(data) => handleFormDataChange(data, "image")}
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
              Restaurant Details Submitted
            </h2>
            <p className="text-center text-sm mb-4">
              Our team will verify the details and reach you shortly!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setModalVisible(false);
                  navigate("/merchant/onboarding");
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

export default OnboardingForm;
