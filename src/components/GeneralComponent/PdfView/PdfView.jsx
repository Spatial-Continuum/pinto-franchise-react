import React, { useState, useEffect } from "react";

const PdfView = ({ selectedFile }) => {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      if (selectedFile instanceof File) {
        const url = URL.createObjectURL(selectedFile);
        setFileUrl(url);

        return () => {
          URL.revokeObjectURL(url);
        };
      } else {
        // Handle the case where selectedFile is a URL
        setFileUrl(selectedFile);
      }
    }
  }, [selectedFile]);

  // Handle PDF download
  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      if (selectedFile instanceof File) {
        link.setAttribute("download", selectedFile.name);
      } else {
        link.setAttribute("download", "downloaded_file.pdf");
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="z-50 justify-center items-center bg-gray-100">
      {fileUrl ? (
        <div className="bg-white shadow-lg rounded-lg p-4">
          {/* <h3 className="text-center text-lg font-semibold mb-4">PDF Preview</h3> */}
          <iframe
            src={fileUrl}
            className="w-full h-[550px] border border-gray-300 rounded"
            title="PDF Preview"
          ></iframe>
          {/* <button onClick={handleDownload} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Download PDF
          </button> */}
        </div>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
};

export default PdfView;
