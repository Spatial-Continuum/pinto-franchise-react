import React, { useState } from 'react';
import AadharReview from './AadharReview';
import PancardReview from './PancardReview';
import DrivingLicenseReview from './DrivingLicenseReviw';
import VrcReview from './VrcReview';
import VinsReview from './VinsReview';
import PassbookReview from './PassbookReview';
const RejectionReviewPopup = ({onClose}) => {
  
  const tabs = ['Aadhar', 'Pancard', 'Driving License', 'V.RC', 'VIns', 'Passbook'];
  const [currentStep, setCurrentStep] = useState(0);

  // Mapping components to each tab
  const tabComponents = [
    <AadharReview />,
    <PancardReview />,
    <DrivingLicenseReview />,
    <VrcReview />,
    <VinsReview />,
    <PassbookReview />
  ];

  const handleNext = ({onClose}) => {
    if (currentStep < tabs.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white w-8/12 p-6 rounded-lg shadow-lg relative">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl font-bold"
      >
        &times;
      </button>

      {/* Owner Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Owner Name</h2>
        <div className="flex flex-row gap-3">
          <p className="text-gray-600">1234567890</p>
          <p className="text-gray-600">owner@example.com</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="absolute top-4 right-16 flex gap-3">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Reject
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Approve
        </button>
      </div>

      <div className='flex flex-col'>
        <h2 className='text-[#000000] font-semibold'>
          Reason for rejection
        </h2>
        <p className='text-[red]'>Document found suspicious & missing...</p>
      </div>

      {/* Progress Navbar */}
      <div className="progress-navbar flex items-center gap-6 mx-5 my-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="p-2 bg-gray-300 colot rounded disabled:opacity-50"
        >
          &lt;
        </button>

        {/* Dynamic Tabs */}
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`step-heading relative cursor-pointer ${currentStep === index ? 'active' : 'text-[#2B2954]'}`}
            onClick={() => setCurrentStep(index)}
          >
            {tab}
            <div
              className={`underline-offset-0 h-1 rounded-sm bg-[#008BFF] transition-all duration-300 ${
                currentStep === index ? 'w-full' : 'w-0'
              }`}
            ></div>
          </div>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentStep === tabs.length - 1}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>

      {/* Render the corresponding component */}
      <div className="p-6 border rounded-lg shadow-md">
        {tabComponents[currentStep]}
      </div>
    </div>
  </div>
  )
}

export default RejectionReviewPopup
