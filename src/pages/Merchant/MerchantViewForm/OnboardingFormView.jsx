import React, { useState, useEffect } from 'react';
// Import necessary components and styles
import RestaurantInfoView from './RestaurantInfoView'
import UploadingImageView from './UploadingImageView';
import TypeTimingsView from './TypeTimingsView';
import editIcon from '../../../assets/images/editicons.svg';
import MainLayout from '../../../components/GeneralComponent/Layout/MainLayout';
import tick from '../../../assets/images/tick.svg';
import { updateRestaurantDetails, getRestaurantById, selectUpdatedRestaurant, selectSelectedRestaurant } from '../../../redux/slices/restaurant';
import '../../../assets/styles/progressNavbar.css';
import { useSelector, useDispatch } from 'react-redux';
import roundTick from '../../../assets/images/roundTick.svg';
import { postNewRestaurant, selectApiError, selectApiLoading } from '../../../redux/slices/restaurant';
import PdfComp from '../../../PdfComp';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import RestaurantService from '../../../modules/restaurants/RestaurantService';

const OnboardingFormView = () => {
  const navigate = useNavigate()
  const { restaurantId } = useParams()
  const updateRestaurant = useSelector(selectUpdatedRestaurant)
  const restaurantDetails = useSelector(selectSelectedRestaurant)
  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);
  const [extraStore, setExtraStore] = useState("")
  const [extraCuisine, setExtraCuisine] = useState("")
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
    door_no: "",
    street_address_1: "",
    street_address_2: "",
    city: "",
    pincode: "",
    otherCuisine:"",
    otherStore:"",
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
  })
  console.log("forming data",formData);
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
      });
    }
    console.log('detailsda', restaurantDetails);
  }, [restaurantDetails])



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

  }


const validateStep = (step) => {
  if (step === 1 && !formData.name) {
    alert('Please fill in the restaurant name.');
    return false;
  }
  if (step === 2 && formData.merchant_type.length === 0) {
    alert('Please select at least one merchant type.');
    return false;
  }
  return true;
};

const handleSubmit = async (event) => {
  event.preventDefault();

    const dataToSubmit = new FormData();
    dataToSubmit.append('name', formData.name);
    dataToSubmit.append('short_description', formData.short_description)
    dataToSubmit.append('door_no', formData.door_no);
    dataToSubmit.append('email',formData.email)
    dataToSubmit.append('street_address_1', formData.street_address_1);
    dataToSubmit.append('street_address_2', formData.street_address_2);
    dataToSubmit.append('gstin', formData.gstin);
    dataToSubmit.append('commission_percentage', formData.commission_percentage);
    dataToSubmit.append('city',formData.city)
    dataToSubmit.append('pincode', formData.pincode)
    dataToSubmit.append('landmark',formData.landmark)
    dataToSubmit.append('primary_phone', formData.primary_phone)
    dataToSubmit.append('secondary_phone',formData.secondary_phone)
    dataToSubmit.append('latitude', formData.latitude);
    dataToSubmit.append('longitude', formData.longitude);
    dataToSubmit.append('restaurant_category', formData.restaurant_category)

let merchantTypes = [...formData.merchant_type]
    if (formData.customStore) {
      merchantTypes.push(formData.customStore); 
    };
    let cuisineTypes = [...formData.cuisine_type ]
    if (formData.customCuisine) {
      cuisineTypes.push(formData.customCuisine); 
    };

    console.log("merchanttypesda",merchantTypes)
    dataToSubmit.append('merchant_type', JSON.stringify(merchantTypes ));
    dataToSubmit.append('cuisine_type', JSON.stringify(cuisineTypes));
    dataToSubmit.append('opening_hours', JSON.stringify(formData.opening_hours));
    if (formData.image instanceof File) {
      dataToSubmit.append('image', formData.image );
    }
    if (formData.logo instanceof File) {
      dataToSubmit.append('logo', formData.logo);
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

    try{
      const response =await RestaurantService.updateRestaurant(restaurantId, dataToSubmit)
      console.log('Restaurant updated', response)
      setModalVisible(true)
    }catch(error){
      console.error('Error submitting form:', error);
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
          <img src={editIcon} alt="Edit" className="w-4 h-4 cursor-pointer"  onClick={() => setIsEditable(true)} />
          {completedSteps.includes(1) && <span> <img src={roundTick} alt="Completed" /></span>}

          {/* Dynamic Underline for Step 1 */}
          <div
            className={`underline-offset-8  h-2 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 1 || (completedSteps.includes(1) && currentStep !== 1) ? 'w-full' : 'w-0'
              }`}
          ></div>
        </div>

        {/* Step 2: Restaurant Type & Timings */}
        <div
          className={`step-heading relative cursor-pointer ${currentStep === 2 ? 'active' : completedSteps.includes(2) ? 'completed' : ''}`}
          onClick={() => setCurrentStep(2)}
        >
          Restaurant Type & Timings

          <img src={editIcon} alt="Edit" className="w-4 h-4 cursor-pointer"  onClick={() => setIsEditable(true)}/>
          {completedSteps.includes(2) && <img src={roundTick} alt="Completed" />}

          {/* Dynamic Underline for Step 2 */}
          <div
            className={`underline-offset-8  h-2 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 2 || completedSteps.includes(2) ? 'w-full' : 'w-0'
              }`}
          ></div>
        </div>

        {/* Step 3: Upload Image */}
        <div
          className={`step-heading relative cursor-pointer ${currentStep === 3 ? 'active' : completedSteps.includes(3) ? 'completed' : ''}`}
          onClick={() => setCurrentStep(3)}
        >
          Upload Image

          <img src={editIcon} alt="Edit" className="w-4 h-4 cursor-pointer"  onClick={() => setIsEditable(true)}/>
          {completedSteps.includes(3) && <img src={roundTick} alt="Completed" />}

          {/* Dynamic Underline for Step 3 */}
          <div
            className={` underline-offset-8  h-2 rounded-xl bg-orange-500 transition-all duration-300 ${currentStep === 3 || completedSteps.includes(3) ? 'w-full' : 'w-0'
              }`}
          ></div>
        </div>
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
          <h2 className="text-center text-2xl font-semibold mb-4">Restaurant Details Edited and Updated</h2>  
          <p className="text-center text-sm mb-4">
            Our team will verify the details and reach you shortly!
          </p>
          <div className="flex justify-center">
            <button
              onClick={() =>  {
                setModalVisible(false);
                navigate('/merchant/onboarding'); // Example route
              }}
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
