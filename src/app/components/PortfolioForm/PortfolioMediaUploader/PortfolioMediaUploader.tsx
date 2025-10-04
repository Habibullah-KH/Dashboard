"use client";

import React, { useEffect, useState } from "react";
import ButtonBorder from "../../Buttons/Button_border/ButtonBorder";
import "./media_style.css";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import ImageUpload from "./ImageUpload";

type propType = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function PortfolioMediaUploader({images, setImages}:propType) {
  const [isClient, setIsClient] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
 if(acceptedFiles && acceptedFiles.length > 0){
  setImages( (prev) => [...prev, ...acceptedFiles]);
 }
  }



  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept: {
      "image/jpeg" : [".jpeg", ".jpg"],
      "image/png" : [".png"],
    },
    multiple: true,
  })

  const allowedExtensions = ["jpg", "jpeg", "png"];

  const checkImageFormat = () => {

    for (const image of images){

      const check = image.name
        .substring(image.name.lastIndexOf(".") + 1)
        .toLowerCase();
  
      if (!allowedExtensions.includes(check)) {
        setImages([]);
        return toast.error("Please upload a valid image (jpg, jpeg, png)");
      }
    };
    }

  useEffect(() => {
    if (images) checkImageFormat();
    setIsClient(true);
  }, [images]);


  if (!isClient) return null;
  return (
    <div className="text-sm p-5 flex flex-col items-center justify-center">
 <div
        {...getRootProps()} // spread dropzone props here

        className={`flex flex-col items-center justify-center h-[240px] w-full image_upload_style 
          ${isDragActive ? "bg-green-100" : ""}`}
      >
        <input {...getInputProps()} /> {/* handles both click + drag */}

        <img src="/image_icon.png" alt="Upload icon" className="w-12 h-12 mb-3" />

        <div>
          <button>
            <ButtonBorder>Upload image</ButtonBorder>
          </button>

          <span className="pl-2">or drop an image file</span>
        </div>
 </div>

{
  images.length ? 
<div className="w-full p-3 mt-3">
{images.map((image, index) => <ImageUpload key={index} imageData={image} onCancel={() => setImages(images.filter((_, i) => i != index))}/>)}
</div>

: null
}


    </div>
  );
}
