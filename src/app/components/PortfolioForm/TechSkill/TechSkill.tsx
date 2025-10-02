"use client";

import React, { useEffect, useState } from "react";
import ButtonBorder from "../../Buttons/Button_border/ButtonBorder";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import ImageUpload from "../PortfolioMediaUploader/ImageUpload";

type propType = {
  skill:string;
  setSkill:React.Dispatch<React.SetStateAction<string>>;
  skillIcon: File[];
  setSkillIcon: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function TechSkill({
    skill, 
    setSkill, 
    skillIcon, 
    setSkillIcon}:propType) 

{
  const [isClient, setIsClient] = useState(false);
console.log(skillIcon);

  const onDrop = (acceptedFiles: File[]) => {
 if(acceptedFiles && acceptedFiles.length > 0){
  setSkillIcon( (prev) => [...prev, ...acceptedFiles]);
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

    for (const image of skillIcon){

      const check = image.name
        .substring(image.name.lastIndexOf(".") + 1)
        .toLowerCase();
  
      if (!allowedExtensions.includes(check)) {
        setSkillIcon([]);
        return toast.error("Please upload a valid image (jpg, jpeg, png)");
      }
    };
    }

  useEffect(() => {
    if (skillIcon) checkImageFormat();
    setIsClient(true);
  }, [skillIcon]);


  if (!isClient) return null;
  return (
    <div className="text-sm p-5 flex flex-col items-center justify-center">
 <div
        {...getRootProps()}

        className={`flex items-center justify-center p-2 rounded-r-2xl`}
      >
        <input {...getInputProps()} /> {/* handles both click + drag */}

        <img src="/image_icon.png" alt="Upload icon" className="w-5 h-5 mr-2" />

        <div>
          <button>
            <ButtonBorder>upload a icon</ButtonBorder>
          </button>
        </div>
 </div>

{
  skillIcon.length ? 
<div className="w-full p-3 mt-3">
{skillIcon.map((image, index) => <ImageUpload key={index} imageData={image} onCancel={() => setSkillIcon(skillIcon.filter((_, i) => i != index))}/>)}
</div>

: null
}


    </div>
  );
}
