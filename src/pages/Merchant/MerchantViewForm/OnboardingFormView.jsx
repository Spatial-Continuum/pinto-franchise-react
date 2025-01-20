import React, { useState, useEffect } from 'react';
// Import necessary components and styles
import RestaurantInfoView from './RestaurantInfoView'
import UploadingImageView from './UploadingImageView';
import TypeTimingsView from './TypeTimingsView';
import editIcon from '../../../assets/images/editicons.svg';
import MainLayout from '../../../components/GeneralComponent/Layout/MainLayout';
import tick from '../../../assets/images/tick.svg';
import {updateRestaurantDetails, getRestaurantById , selectSelectedRestaurant } from '../../../redux/slices/restaurant';
import '../../../assets/styles/progressNavbar.css';
import { useSelector, useDispatch } from 'react-redux';
import roundTick from '../../../assets/images/roundTick.svg';
import { postNewRestaurant, selectApiError, selectApiLoading } from '../../../redux/slices/restaurant';
import PdfComp from '../../../PdfComp';
import { useParams } from 'react-router-dom';

const OnboardingFormView = () => {
    const {restaurantId} = useParams()
    
    const restaurantDetails = useSelector(selectSelectedRestaurant)
  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);
  const [extraStore, setExtraStore] = useState("")
  const [extraCuisine, setExtraCuisine] = useState("")
const [isEditMode, setIsEditMode] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    // Fetch restaurant details on component mount
    dispatch(getRestaurantById(restaurantId));
    
      
  }, [dispatch]);

useEffect(()=>{
  if (restaurantDetails) {
    setRestaurantInfo(restaurantDetails);
  }
  console.log('detailsda',restaurantDetails);
},[restaurantDetails ])

 

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps((prev) => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep]
        }
        return prev;
      })
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
    if (step === 'typeTimings') {
      setExtraStore(newData.customStore)
      setExtraCuisine(newData.customCuisine)
      console.log('cuisineda:',extraCuisine)
    }
  };

  const validateStep = (step) => {
    if (step === 1 && !restaurantInfo.name) {
      alert('Please fill in the restaurant name.');
      return false;
    }
    if (step === 2 && restaurantInfo.merchant_type.length === 0) {
      alert('Please select at least one merchant type.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (isEditMode) {
        // Update existing restaurant
        await dispatch(updateRestaurantDetails(formData)).unwrap();
      } else {
    const dataToSubmit = new FormData();

   
    dataToSubmit.append('name', formData.restaurantInfo.name);
    dataToSubmit.append('short_description', formData.restaurantInfo.short_description);
    dataToSubmit.append('door_no', formData.restaurantInfo.door_no);
    dataToSubmit.append('email', formData.restaurantInfo.email);
    dataToSubmit.append('street_address_1', formData.restaurantInfo.street_address_1);
    dataToSubmit.append('street_address_2', formData.restaurantInfo.street_address_2);
    dataToSubmit.append('city', formData.restaurantInfo.city);
    dataToSubmit.append('pincode', formData.restaurantInfo.pincode);
    dataToSubmit.append('landmark', formData.restaurantInfo.landmark);
    dataToSubmit.append('primary_phone', formData.restaurantInfo.primary_phone);
    dataToSubmit.append('secondary_phone', formData.restaurantInfo.secondary_phone);
    dataToSubmit.append('email', formData.restaurantInfo.email);


    dataToSubmit.append('restaurant_category', formData.typeTimings.restaurant_category);
    // let merchantTypes = [...formData.typeTimings.merchant_type]
    // if (extraStore) {
    //   merchantTypes.push(extraStore); 
    // };
    // let cuisineTypes = [...formData.typeTimings.cuisine_type ]
    // if (extraCuisine) {
    //   cuisineTypes.push(extraCuisine); 
    // };
  
  
   //console.log("merchanttypesda",merchantTypes)


    dataToSubmit.append('merchant_type', JSON.stringify(formData.typeTimings.merchant_type ));
    dataToSubmit.append('cuisine_type', JSON.stringify(formData.typeTimings.cuisine_type));
    dataToSubmit.append('opening_hours', JSON.stringify(formData.typeTimings.opening_hours));

    if (formData.image.image instanceof File) {
      dataToSubmit.append('image', formData.image.image );
    }
    if (formData.image.logo instanceof File) {
      dataToSubmit.append('logo', formData.image.logo);
    }

   
    dataToSubmit.append('latitude', "12.971598");
    dataToSubmit.append('longitude', "77.594566");
    // console.log('Form Data submitted:', formData);
    for (const [key, value] of dataToSubmit.entries()) {
      console.log(`${key}: ${value}`);
    }


    try {
      await dispatch(updateRestaurantDetails(dataToSubmit)).unwrap();
      setModalVisible(true);
    } catch (error) {
      console.error('Error submiting fomr', error)
    }

   
}
}

  return (
    <MainLayout>
      <div className="mb-36">
        {/* Progress Navbar */}
        <div className="progress-navbar flex gap-6 mx-5 my-4">
        <div
      className={`step-heading relative cursor-pointer  ${currentStep === 1 ? 'active' : completedSteps.includes(1) ? 'completed' : ''}`}
      onClick={() => setCurrentStep(1)}
    >
      Restaurant Info 
    <img src={editIcon} alt="Edit" className="w-4 h-4 cursor-pointer" />
      {completedSteps.includes(1) && <span> <img src={roundTick} alt="Completed" /></span>}

      {/* Dynamic Underline for Step 1 */}
      <div
        className={`underline-offset-8  h-2 rounded-xl bg-orange-500 transition-all duration-300 ${
          currentStep === 1 || (completedSteps.includes(1) && currentStep !== 1) ? 'w-full' : 'w-0'
        }`}
      ></div>
    </div>

    {/* Step 2: Restaurant Type & Timings */}
    <div
      className={`step-heading relative cursor-pointer ${currentStep === 2 ? 'active' : completedSteps.includes(2) ? 'completed' : ''}`}
      onClick={() => setCurrentStep(2)}
    >
      Restaurant Type & Timings

    <img src={editIcon} alt="Edit" className="w-4 h-4 cursor-pointer" />
      {completedSteps.includes(2) && <img src={roundTick} alt="Completed" />}

      {/* Dynamic Underline for Step 2 */}
      <div
        className={`underline-offset-8  h-2 rounded-xl bg-orange-500 transition-all duration-300 ${
          currentStep === 2 || completedSteps.includes(2) ? 'w-full' : 'w-0'
        }`}
      ></div>
    </div>

    {/* Step 3: Upload Image */}
    <div
      className={`step-heading relative cursor-pointer ${currentStep === 3 ? 'active' : completedSteps.includes(3) ? 'completed' : ''}`}
      onClick={() => setCurrentStep(3)}
    >
      Upload Image

    <img src={editIcon} alt="Edit" className="w-4 h-4 cursor-pointer" />
      {completedSteps.includes(3) && <img src={roundTick} alt="Completed" />}

      {/* Dynamic Underline for Step 3 */}
      <div
        className={` underline-offset-8  h-2 rounded-xl bg-orange-500 transition-all duration-300 ${
          currentStep === 3 || completedSteps.includes(3) ? 'w-full' : 'w-0'
        }`}
      ></div>
    </div>
  </div>

        {currentStep === 1 && (
          <RestaurantInfoView
            restaurantInfo={restaurantInfo}
            onDataChange={ handleFormDataChange}
          />
        )}

        {currentStep === 2 && (
          <TypeTimingsView
          restaurantInfo={restaurantInfo}
            ExtraCuisine={extraCuisine}
            ExtraStore={extraStore}
            onDataChange={handleFormDataChange}
          />
        )}

        {currentStep === 3 && (
          <UploadingImageView
           restaurantInfo={restaurantInfo}
            onDataChange={handleFormDataChange}
          />
        )}

        <div>
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="w-32 h-8 rounded-lg border-[1px] border-[#030714] bg-[#FAFAFA] mr-5 mx-5"
            >
              Clear
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
            <img src={tick} alt="Tick" className="w-24 h-11 mx-auto mt-20 mb-6" />
            <h2 className="text-center text-2xl font-semibold mb-4">Restaurant Details Submitted</h2>
            <p className="text-center text-sm mb-4">
              Our team will verify the details and reach you shortly!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setModalVisible(false)}
                className="w-32 h-8 text-white bg-[#004680] rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      
    </MainLayout>
  );
};

export default OnboardingFormView;
