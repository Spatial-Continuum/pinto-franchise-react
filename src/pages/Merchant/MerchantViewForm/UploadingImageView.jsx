import React, { useState, useRef, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import upload from '../../../assets/images/Upload.svg';

const UploadingImageView = ({ formData, onDataChange ,isEditable}) => {
  const [data, setData] = useState({
    ...formData,
    image: {
      image: formData?.image || null,
      logo: formData?.logo || null,
    }
  });

  const [previews, setPreviews] = useState({
    fssaiPreview: formData?.fssaiCertificate ? 'PDF file uploaded' : null,
    imagePreview: formData?.image && formData.image instanceof File
      ? URL.createObjectURL(formData.image)
      : formData?.image || null,
    logoPreview: formData?.logo && formData.logo instanceof File
      ? URL.createObjectURL(formData.logo)
      : formData?.logo || null,
  });

  const imageInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previews.imagePreview && typeof formData?.image !== 'string') {
        URL.revokeObjectURL(previews.imagePreview);
      }
      if (previews.logoPreview && typeof formData?.logo !== 'string') {
        URL.revokeObjectURL(previews.logoPreview);
      }
    };
  }, [previews.imagePreview, previews.logoPreview]);

  useEffect(() => {
    onDataChange(data);
  }, [data, onDataChange]);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prevPreviews) => ({
            ...prevPreviews,
            [`${type}Preview`]: reader.result, // Store the preview URL
          }));
          setData((prevData) => {
            const updatedImageData = {
              ...prevData.image,
              [`${type}`]: file,  // Store the actual file
            };
            return { image: updatedImageData };
          });
        };
        reader.readAsDataURL(file);  // Read the file as Data URL for preview
      } else if (file.type === 'application/pdf' && type === 'fssaiCertificate') {
        setPreviews((prevPreviews) => ({
          ...prevPreviews,
          [`${type}Preview`]: 'PDF file uploaded', // Set a placeholder message for PDF
        }));
        setData((prevData) => {
          const updatedImageData = {
            ...prevData.image,
            [`${type}`]: file,  // Store the actual PDF file
          };
          return { image: updatedImageData };
        });
      } else {
        console.log(`No valid ${type} file selected`);
      }
      event.target.value = null;  
    }
  };

  const handleEditIconClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = null;  // Clear the input value
      imageInputRef.current.click(); // Trigger file input when icon is clicked
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-row gap-11">
        {/* Restaurant Image Upload */}
        <div className="flex flex-col">
          <h2 className="font-medium text-gray-800 mb-4">Add Restaurant Image</h2>
          <div className="bg-[#FAFAFA] p-6 border border-[#DEDEDE] rounded-lg mt-2">
            <div className="w-60 h-48 bg-[#FFFFFF] border-[1px] border-[#C9C9C9] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 relative">
              {previews.imagePreview ? (
                <>
                  <img
                    src={previews.imagePreview}
                    alt="Restaurant Image Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                  {/* Edit Icon */}
                  <PhotoIcon
                    onClick={handleEditIconClick}
                    className="absolute top-2 right-2 w-6 h-6 text-blue-500 cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <label htmlFor="upload-image" className="flex flex-col items-center text-gray-600 cursor-pointer">
                    <img src={upload} className="h-10 w-10 mb-2" />
                    <span className="text-sm font-medium text-[#008BFF]">Choose Image</span>
                    <span className='text-xs'>Image must be under 5mb*</span>
                  </label>
                  <input
                    type="file"
                    ref={imageInputRef} // Reference the file input element
                    id="upload-image"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')} // Handle image file selection
                  />
                </>
              )}
            </div>
            <span className='text-xs'>Image must be under 5mb*</span>
          </div>
        </div>

        {/* Restaurant Logo Upload */}
        <div className="flex flex-col">
          <h2 className="font-medium text-gray-800 mb-4">Add Restaurant Logo</h2>
          <div className="bg-[#FAFAFA] p-6 border border-[#DEDEDE] rounded-lg mt-2">
            <div className="w-60 h-48 bg-[#FFFFFF] border-[1px] border-[#C9C9C9] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 relative">
              {previews.logoPreview ? (
                <img
                  src={previews.logoPreview}
                  alt="Restaurant Logo Preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <>
                  <label htmlFor="upload-logo" className="flex flex-col items-center text-gray-600 cursor-pointer">
                    <img src={upload} className="h-10 w-10 mb-2" />
                    <span className="text-sm font-medium text-[#008BFF]">Choose Logo</span>
                    <span className='text-xs'>Logo must be under 5mb*</span>
                  </label>
                  <input
                    type="file"
                    id="upload-logo"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')} // Handle logo file selection
                  />
                </>
              )}
            </div>
            <span className='text-xs'>Image must be under 5mb*</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadingImageView;
