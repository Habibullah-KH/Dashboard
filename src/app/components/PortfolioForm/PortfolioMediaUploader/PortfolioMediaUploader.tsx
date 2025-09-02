"use client";

import React, { useEffect, useRef, useState } from "react";
import ButtonBorder from "../../Buttons/Button_border/ButtonBorder";
import "./media_style.css";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

export default function PortfolioMediaUploader() {
  const [image, setImage] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
 if(acceptedFiles && acceptedFiles.length > 0){
  setImage(acceptedFiles[0])
 }
  }

  console.log(image);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept: {
      "image/jpeg" : [".jpeg", ".jpg"],
      "image/png" : [".png"],
    },
    multiple: false,
  })

  const allowedExtensions = ["jpg", "jpeg", "png"];

  const checkImageFormat = () => {
    if (!image){
      return toast.error('please upload image');
    };

    const check = image.name
      .substring(image.name.lastIndexOf(".") + 1)
      .toLowerCase();

    if (!allowedExtensions.includes(check)) {
      setImage(null);
      return toast.error("Please upload a valid image (jpg, jpeg, png)");
    }
  };

  useEffect(() => {
    if (image) checkImageFormat();
  }, [image]);

  return (
    <div className="text-sm p-5 flex items-center justify-center">
 <div
        {...getRootProps()} // 👈 spread dropzone props here

        className={`flex flex-col items-center justify-center h-[240px] w-full image_upload_style 
          ${isDragActive ? "bg-green-100" : ""}`}
      >
        <input {...getInputProps()} /> {/* 👈 handles both click + drag */}

        <img src="/image_icon.png" alt="Upload icon" className="w-12 h-12 mb-3" />

        <div>
          <button>
            <ButtonBorder>Upload image</ButtonBorder>
          </button>

          {/* <input
            ref={fileInputRef}
            id="image"
            name="image"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            className="opacity-0 absolute w-0 h-0"
            required
          /> */}




          <span className="pl-2">or drop an image file</span>
        </div>
      </div>
      {
      image ? <span >{image.name}</span> : <p>kichui nai</p>
      }
    </div>
  );
}
