import React, { useState } from 'react';
// Import necessary components and styles
import RestaurantInfo from '../NewMerchantForm/RestaurantInfo';
import UploadingImage from '../NewMerchantForm/UploadingImage';
import RestaurantTypeTimings from '../NewMerchantForm/RestaurantTypeTimings';
import MainLayout from '../../../components/GeneralComponent/Layout/MainLayout';
import tick from '../../../assets/images/tick.svg';
import '../../../assets/styles/progressNavbar.css';
import { useSelector, useDispatch } from 'react-redux';
import roundTick from '../../../assets/images/roundTick.svg';
import { postNewRestaurant, selectApiError, selectApiLoading } from '../../../redux/slices/restaurant';
import PdfComp from '../../../PdfComp';

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);

  const [formData, setFormData] = useState({
    restaurantInfo: {
      name: '',
      door_no: '',
      street_address_1: '',
      street_address_2: '',
      email: '',
      city: '',
      pincode: '',
      landmark: '',
      primary_phone: '',
      secondary_phone: '',
    },
    typeTimings: {
      restaurant_category: '',
      merchant_type: [],
      short_description: '',
      cuisine_type: [],
      opening_hours: {
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: '',
      },
    },
    image: {
      image: '',
      logo: '',
    },
  });

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
  };

  const validateStep = (step) => {
    if (step === 1 && !formData.restaurantInfo.name) {
      alert('Please fill in the restaurant name.');
      return false;
    }
    if (step === 2 && formData.typeTimings.merchant_type.length === 0) {
      alert('Please select at least one merchant type.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
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
    dataToSubmit.append('merchant_type', JSON.stringify(formData.typeTimings.merchant_type));
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
    console.log('Form Data submitted:', formData);


    try {
      await dispatch(postNewRestaurant(dataToSubmit)).unwrap();
      setModalVisible(true);
    } catch (error) {
      console.error('Error submiting fomr', error)
    }

   
  };

  return (
    <MainLayout>
      <div className="mb-36">
        {/* Progress Navbar */}
        <div className="progress-navbar flex gap-6 mx-5 my-4">
          <div
            className={`step-heading ${currentStep === 1 ? 'active' : completedSteps.includes(1)
              ? 'completed'
              : ''}`}
            onClick={() => setCurrentStep(1)}
          >
            Restaurant Info {completedSteps.includes(1) && <span> <img src={roundTick} alt="Completed" /></span>}
          </div>
          <div
            className={`step-heading ${currentStep === 2 ? 'active' : completedSteps.includes(2)
              ? 'completed'
              : ''}`}
            onClick={() => setCurrentStep(2)}
          >
            Restaurant Type & Timings {completedSteps.includes(2) && <img src={roundTick} alt="Completed" />}
          </div>
          <div
            className={`step-heading ${currentStep === 3 ? 'active' : completedSteps.includes(3)
              ? 'completed'
              : ''}`}
            onClick={() => setCurrentStep(3)}
          >
            Upload Image {completedSteps.includes(3) && <img src={roundTick} alt="Completed" />}
          </div>
        </div>

        

        {currentStep === 1 && (
          <RestaurantInfo
            formData={formData.restaurantInfo}
            onDataChange={(data) => handleFormDataChange(data, 'restaurantInfo')}
          />
        )}

        {currentStep === 2 && (
          <RestaurantTypeTimings
            formData={formData.typeTimings}
            onDataChange={(data) => handleFormDataChange(data, 'typeTimings')}
          />
        )}

        {currentStep === 3 && (
          <UploadingImage
            formData={formData.image}
            onDataChange={(data) => handleFormDataChange(data, 'image')}
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

export default OnboardingForm;
