import React, { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import upload from '../../../assets/images/Upload.svg';
import { pdfjs } from 'react-pdf';
import { Document } from 'react-pdf'
import PdfComp from '../../../PdfComp';

const UploadingImage = ({ formData, onDataChange }) => {
  // Initialize state for image and logo file objects and their previews
  const [data, setData] = useState({
    image: {
      image: formData?.image?.image || '' ,

      logo: formData?.image?.logo || '' ,
      fssaiCertificate: formData?.image?.fssaiCertificate || '' ,
    }
  });
  const [previews, setPreviews] = useState({
    fssaiPreview: null,
    imagePreview: null,
    logoPreview: null,
  });


  useEffect(() => {
    // Whenever data is updated, call onDataChange to propagate the changes
    onDataChange(data);
    console.log('onDataChange', data);
  }, [data ]);

  const [message , setMessage] = useState("")

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        // Handling image files (image and logo upload)
        console.log(`${type} image file selected:`, file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prevPreviews) => ({
            ...prevPreviews,
            [`${type}Preview`]: reader.result, // Store the preview URL
          }));

          // setData((prevData) => {
          //   const updatedImageData = {
          //     ...prevData.image,
          //     [`${type}`]: file,  // Store the actual file
          //   };
          //   return { image: updatedImageData };
          // });

          setData((prevData) =>({
            ...prevData,
            image:{...prevData.image, [type]:file},
          }))
        };
        reader.readAsDataURL(file);  // Read the file as Data URL for preview
      } else if (file.type === 'application/pdf' && type === 'fssaiCertificate') {
        // Handling PDF files (only for FSSAI certification)
        console.log(`${type} PDF file selected:`, file);
        const url = URL.createObjectURL(file);
        // setPreviews((prev)=>({
        //   ...prev,
        //   fssaiPreview: url,
        // }))
        setPreviews((prevPreviews) => ({
          ...prevPreviews,
          fssaiPreview: "pdf selected", // Set a placeholder message for PDF
        }));
        // setData((prevData) => {
        //   const updatedImageData = {
        //     ...prevData.image,
        //     [`${type}`]: file,  // Store the actual PDF file
        //   };
        //   return { image: updatedImageData };
        // });
        setData((prevData)=>({
          ...prevData,
          image:{...prevData.image, fssaiCertificate:file},
        }))
      } else {
       setMessage("Invalid file type selected.")
      }
    }
  };


  //  
  return (
    <div className="p-5 ">
      <div className="flex flex-row gap-11">
        {/* Restaurant Image Upload */}
        <div className="flex flex-col">
          <h2 className="font-medium text-gray-800 mb-4">Add Restaurant Image</h2>
          <div className=" bg-[#FAFAFA] p-6  border border-[#DEDEDE] rounded-lg mt-2">
            <div className="w-60 h-48 bg-[#FFFFFF] border-[1px] border-[#C9C9C9] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 relative">
              {previews.imagePreview ? (
                <img
                  src={previews.imagePreview}
                  alt="Restaurant Image Preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <>
                  <label htmlFor="upload-image" className="flex flex-col items-center text-gray-600 cursor-pointer">
                    <img src={upload} className="h-10 w-10 mb-2" />
                    <span className="text-sm font-medium text-[#008BFF] ">Choose Image</span>
                    <span className='text-xs'>Image must be under 5mb*</span>
                  </label>
                  <input
                    type="file"
                    name="image"
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
          <div className=" bg-[#FAFAFA] p-6 border border-[#DEDEDE] rounded-lg mt-2">
            <div className="w-60 h-48 bg-[#FFFFFF] border-[1px] border-[#C9C9C9] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 relative">
              {previews.logoPreview ? (
                <img
                  src={previews.logoPreview}
                  alt="Restaurant Logo Preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <>

                  <label htmlFor="upload-logo" className="flex flex-col items-center  text-gray-600 cursor-pointer">
                    <img src={upload} className=" " />
                    <span className="text-sm font-medium text-[#008BFF]">Restaurant Logo</span>
                    <span className='text-xs'>Image must be under 5mb*</span>
                  </label>
                  <input
                    type="file"
                    name="logo"
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


        <div className="flex flex-col">
          <h2 className="font-medium text-gray-800 mb-4">FSSAI certification</h2>
          <div className=" bg-[#FAFAFA] p-6 border border-[#DEDEDE] rounded-lg mt-2">
            <div className="w-60 h-48 bg-[#FFFFFF] border-[1px] border-[#C9C9C9] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 relative">
              {previews.fssaiPreview ? (
                <div className="text-center">{previews.fssaiPreview}</div>
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
      {message && <div className="mt-4 text-red-500 text-xs">{message}</div>}

    </div>
  );
};

export default UploadingImage;




