"use client"

import React, { useEffect, useRef, useState } from 'react'
import ButtonBorder from '../../Buttons/Button_border/ButtonBorder'
import "./media_style.css"
import { toast } from 'react-toastify';


export default function PortfolioMediaUploader() {
const [image, setImage] = useState<File | null>(null);

  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageInput = ()=>{
    fileInputRef.current.click();
  }
  
    const allowedExtensions = ["jpg", "jpeg", "png"];
  
    const checkImageformate = () => {
      const check = image.name.substring(image.name.lastIndexOf(".") + 1);
  
      if(!allowedExtensions.includes(check)){
         setImage(null)
        return toast.error("Please upload a valid image (jpg, jpeg, png)");
      }
    }
  
    useEffect(() => {
      if(image){checkImageformate()}
    }, [image])
  return (
    <>
    <div 
    className='
     text-sm p-5
     flex items-center justify-center
     '>

    <div className='
    flex flex-col items-center justify-center h-[240px] w-full
    image_upload_style
    '>
     {/* Import or public folder usage recommended */}
        <img
          src="/image_icon.png"
          alt="Upload icon"
          className="w-12 h-12 mb-3"
        />
        <div>

      <button onClick={handleImageInput}>
      <ButtonBorder>
        Upload image
      </ButtonBorder>
      </button>

      <input
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
        />
      <span className='pl-2'> or drop a image file</span>
        </div>
    </div>

    </div>
    </>
  )
}
