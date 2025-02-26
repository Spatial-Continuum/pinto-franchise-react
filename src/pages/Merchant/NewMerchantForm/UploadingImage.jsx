import React, { useState, useEffect } from 'react';
import upload from '../../../assets/images/Upload.svg';
import PdfView from '../../../components/GeneralComponent/PdfView/PdfView'

const UploadingImage = ({ formData, onDataChange }) => {
  const [data, setData] = useState({
    image: {
      image: formData?.image?.image || '',
      logo: formData?.image?.logo || '',
      fssaiCertificate: formData?.image?.fssaiCertificate || '',
    }
  });
  const [previews, setPreviews] = useState({
    fssaiPreview: null,
    imagePreview: null,
    logoPreview: null,
  });
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  useEffect(() => {
    onDataChange(data);
    console.log('onDataChange', data);
  }, [data]);

  const [message, setMessage] = useState("");

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
            image: { ...prevData.image, [type]: file },
          }));
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf' && type === 'fssaiCertificate') {
        setPreviews((prevPreviews) => ({
          ...prevPreviews,
          fssaiPreview: file,
        }));
        setData((prevData) => ({
          ...prevData,
          image: { ...prevData.image, fssaiCertificate: file },
        }));
      } else {
        setMessage("Invalid file type selected.");
      }
    }
  };

  const togglePdfPreview = () => {
    setShowPdfPreview((prevShowPdfPreview) => !prevShowPdfPreview);
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
                <img
                  src={previews.imagePreview}
                  alt="Restaurant Image Preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <>
                  <label htmlFor="upload-image" className="flex flex-col items-center text-gray-600 cursor-pointer">
                    <img src={upload} className="h-10 w-10 mb-2" />
                    <span className="text-sm font-medium text-[#008BFF]">Choose Image</span>
                    <span className='text-xs'>Image must be under 10mb*</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="upload-image"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')}
                  />
                </>
              )}
            </div>
            <span className='text-xs'>Image must be under 10mb*</span>
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
                    <img src={upload} className=" " />
                    <span className="text-sm font-medium text-[#008BFF]">Restaurant Logo</span>
                    <span className='text-xs'>Image must be under 10mb*</span>
                  </label>
                  <input
                    type="file"
                    name="logo"
                    id="upload-logo"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')}
                  />
                </>
              )}
            </div>
            <span className='text-xs'>Image must be under 10mb*</span>
          </div>
        </div>

        {/* FSSAI Certification Upload */}
        <div className="flex flex-col">
          <h2 className="font-medium text-gray-800 mb-4">FSSAI Certification</h2>
          <div className="bg-[#FAFAFA] p-6 border border-[#DEDEDE] rounded-lg mt-2">
            <div className="w-60 h-48 bg-[#FFFFFF] border-[1px] border-[#C9C9C9] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 relative">
              {previews.fssaiPreview ? (
                <>
                  <button onClick={togglePdfPreview} className="mb-2 px-4 py-2 bg-blue-500 text-white rounded">
                    {showPdfPreview ? 'Hide PDF' : 'View PDF'}
                  </button>
                  {showPdfPreview && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="w-3/5 h-3/4 bg-white shadow-lg rounded-lg p-4 relative">
                        <button
                          onClick={togglePdfPreview}
                          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Close
                        </button>
                        <h3 className="text-center text-lg font-semibold mb-4">
                          PDF Preview
                        </h3>
                        <PdfView selectedFile={previews.fssaiPreview} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label htmlFor="upload-pdf" className="flex flex-col items-center text-gray-600 cursor-pointer">
                    <img src={upload} className=" " />
                    <span className="text-sm font-medium text-[#008BFF]">Upload Certification in PDF</span>
                    <span className='text-xs'>PDF must be under 10mb*</span>
                  </label>
                  <input
                    type="file"
                    name="fssaiCertificate"
                    id="upload-pdf"
                    className="hidden"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, 'fssaiCertificate')}
                  />
                </>
              )}
            </div>
            <span className='text-xs'>PDF must be under 10mb*</span>
          </div>
        </div>
      </div>
      {message && <div className="mt-4 text-red-500 text-xs">{message}</div>}
    </div>
  );
};

export default UploadingImage;
