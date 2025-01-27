import React, { useState, useRef, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import upload from '../../../assets/images/Upload.svg';

const UploadingImageView = ({ formData, onDataChange, isEditable }) => {
  const [data, setData] = useState({
    ...formData,
    image: formData?.image || null,
    logo: formData?.logo || null,
    fassai:formData?.fassai || null,
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
  const logoInputRef = useRef(null);
  const fssaiInputRef = useRef(null);

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
            [`${type}Preview`]: reader.result,
          }));
          setData((prevData) => ({
            ...prevData,
            [type]: file,
          }));
          onDataChange({
            ...data,
            [type]: file,
          });
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf' && type === 'fssaiCertificate') {
        setPreviews((prevPreviews) => ({
          ...prevPreviews,
          fssaiPreview: 'PDF file uploaded',
        }));
        setData((prevData) => ({
          ...prevData,
          fassai: file,
        }));
        onDataChange({
          ...data,
          fassai: file,
        });
      } else {
        console.log(`No valid ${type} file selected`);
      }
      event.target.value = null;
    }
  };

  const handleEditIconClick = (type) => {
    console.log('handleEditIconClick called with type:', type);
    if (type === 'image') {
      setData((prevData) => ({
        ...prevData,
        image: null,
      }));
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        imagePreview: null,
      }));
      
      if (imageInputRef.current) {
        imageInputRef.current.value = null;
        imageInputRef.current.click();
      }
    } else if (type === 'logo') {
      setData((prevData) => ({
        ...prevData,
        logo: null,
      }));
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        logoPreview: null,
      }));
      
      if (logoInputRef.current) {
        logoInputRef.current.value = null;
        logoInputRef.current.click();
      }
    } else if (type === 'fssaiCertificate') {
      setData((prevData) => ({
        ...prevData,
        fassai: null,
      }));
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        fssaiPreview: null,
      }));

      if (fssaiInputRef.current) {
        fssaiInputRef.current.value = null;
        fssaiInputRef.current.click();
      }
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
                  <PhotoIcon
                    onClick={() => handleEditIconClick('image')}
                    className="absolute z-50 top-2 right-2 w-6 h-6 text-blue-500 cursor-pointer"
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
                    ref={imageInputRef}
                    id="upload-image"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')}
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
                <>
                  <img
                    src={previews.logoPreview}
                    alt="Restaurant Logo Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                  <PhotoIcon
                    onClick={() => handleEditIconClick('logo')}
                    className="absolute top-2 right-2 w-6 h-6 text-blue-500 cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <label htmlFor="upload-logo" className="flex flex-col items-center text-gray-600 cursor-pointer">
                    <img src={upload} className="h-10 w-10 mb-2" />
                    <span className="text-sm font-medium text-[#008BFF]">Choose Logo</span>
                    <span className='text-xs'>Logo must be under 5mb*</span>
                  </label>
                  <input
                    type="file"
                    ref={logoInputRef}
                    id="upload-logo"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')}
                  />
                </>
              )}
            </div>
            <span className='text-xs'>Logo must be under 5mb*</span>
          </div>
        </div>

        {/* Fassai Certificate Upload */}
        <div className="flex flex-col">
                  <h2 className="font-medium text-gray-800 mb-4">FSSAI certification</h2>
                  <div className=" bg-[#FAFAFA] p-6 border border-[#DEDEDE] rounded-lg mt-2">
                    <div className="w-60 h-48 bg-[#FFFFFF] border-[1px] border-[#C9C9C9] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 relative">
                      {previews.fssaiPreview ? (
                       <>
                       <img
                         src={previews.fssaiPreview}
                         alt="Restaurant PDF Preview"
                         className="object-cover w-full h-full rounded-md"
                       />
                       <PhotoIcon
                         onClick={() => handleEditIconClick('fssaiCertificate')}
                         className="absolute z-50 top-2 right-2 w-6 h-6 text-blue-500 cursor-pointer"
                       />
                     </>
                      ) : (
                        <>
        
                          <label htmlFor="upload-pdf" className="flex flex-col items-center  text-gray-600 cursor-pointer">
                            <img src={upload} className=" " />
                            <span className="text-sm font-medium text-[#008BFF]">Upload certification in PDF</span>
                            <span className='text-xs'>PDF must be under 5mb*</span>
                          </label>
                          <input
                            type="file"
                            name="fssaiCertificate"
                            ref={fssaiInputRef}
                            id="upload-pdf"
                            className="hidden"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, 'fssaiCertificate')} // Handle logo file selection
                          />
                        </>
                      )}
                    </div>
                    <span className='text-xs'>PDF must be under 5mb*</span>
                  </div>
                </div>
      </div>
    </div>
  );
};

export default UploadingImageView;
