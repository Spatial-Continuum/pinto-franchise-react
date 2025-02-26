import React from 'react';

const OnboardPopup = ({onClose}) => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-8/ p-6 rounded-lg shadow-lg relative">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl font-bold"
        onClick={onClose}>
          &times;
        </button>

        {/* Owner details */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Owner Name</h2>
          <div className='flex flex-row gap-3'>
          <p className="text-gray-600">1234567890</p>
          <p className="text-gray-600">owner@example.com</p>
          </div>
        </div>

        {/* Form with border */}
        <div className="border border-gray-300 p-4 rounded-lg">
          {/* Input Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <input type="text" className="mt-1 p-2 border rounded w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input type="text" className="mt-1 p-2 border rounded w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile No</label>
              <input type="text" className="mt-1 p-2 border rounded w-full" />
            </div>
          </div>

          {/* Address Section */}
          <h3 className="text-lg font-semibold mb-2">Address</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Door No</label>
            <input type="text" className="mt-1 p-2 border rounded w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address 1</label>
              <input type="text" className="mt-1 p-2 border rounded w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address 2</label>
              <input type="text" className="mt-1 p-2 border rounded w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" className="mt-1 p-2 border rounded w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input type="text" className="mt-1 p-2 border rounded w-full" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Landmark</label>
            <input type="text" className="mt-1 p-2 border rounded w-full" />
          </div>

          {/* Employment Type Section */}
          <h3 className="text-lg font-semibold mb-2">Employment Type</h3>
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center">
              <input type="radio" name="employmentType" className="mr-2" />
              SALARIED
            </label>
            <label className="flex items-center">
              <input type="radio" name="employmentType" className="mr-2" />
              DELIVERY BASED
            </label>
          </div>

          {/* Onboard Button */}
          <button className="w-2/6 bg-[#008B0E] text-white p-2 rounded-lg hover:bg-[#008B0E] transition">
            Onboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardPopup;
