import React, { useState } from "react";

import api from "./../../auth/api";

import { ToastContainer, toast } from 'react-toastify';

function ExcelImport() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    let fileType = file.type;
    console.log(fileType);


    if (!file) {
      toast.error("Please select a file first");  
      return;
    }

    if (
        fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        fileType === 'application/vnd.ms-excel'
    ){

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await api.post("/exchangeratesexcelimport", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          // console.log(response.data);
          toast.success("File uploaded successfully!");  
        } catch (error) {
          console.error(error);
          alert("File upload failed!");
        }
    }else{
      toast.error("We only accept excel format. (.xlsx)");  
      return;
    }

  };

  return (
          
    <>
        <div className="col-md-4 mb-2 d-flex">
        <input
            type="file"
            id="excel"
            name="excel"
            className="form form-control"
            onChange={handleFileChange}
        />
        <button
            type="button"
            className="btn btn-success mb-2"
            onClick={handleImport}
        >
            Import
        </button>
        <ToastContainer/>

        </div>
    </>

  );
}

export default ExcelImport;
