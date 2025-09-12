"use client";

import React, { useEffect, useState } from "react";
import ButtonBorder from "../../Buttons/Button_border/ButtonBorder";
import "./media_style.css";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import ImageUpload from "./ImageUpload";
import UseLocalStorage from "@/app/hooks/useLocalStorage";
import ImageCard from "./component/ImageCard";

export default function PortfolioMediaUploader() {
  const [image, setImage] = useState<File | null>(null);

  const {value} = UseLocalStorage("url", [])
console.log(value);
  const onDrop = (acceptedFiles: File[]) => {
 if(acceptedFiles && acceptedFiles.length > 0){
  setImage(acceptedFiles[0])
 }
  }



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
    <div className="text-sm p-5 flex flex-col items-center justify-center">
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


          <span className="pl-2">or drop an image file</span>
        </div>
 </div>

<ImageUpload imageData={image} onCancel={() => setImage(null)}/>


<div>
  {value.map((uri, i) => <ImageCard key={i} value={uri}/>)}
  {/* {value.map(data => console.log(data))} */}
</div>

    </div>
  );
}
