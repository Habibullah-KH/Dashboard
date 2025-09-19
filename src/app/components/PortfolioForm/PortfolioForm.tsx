"use client";
import React, { useState } from 'react';
import PortfolioTextFields from './PortfolioTextFields/PortfolioTextFields';
import PortfolioMediaUploader from './PortfolioMediaUploader/PortfolioMediaUploader';
import ButtonFill from '../Button_fill/ButtonFill';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { imageUpload } from '@/app/lib/utils/imageUpload';

export default function PortfolioForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const [imagebbUrl, setImagebbUrl] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const data = {
    title:title, description:description, images:imagebbUrl
  }


  const handleSubmit = async() => {
    if(!title || !description || images.length === 0){
      return toast.error('Please fill the form properly');
    }
    setLoading(true);

    try{

      //image upload on mongoDB - 1
      // const imgeUrls = await Promise.all(images.map(img => imageUpload(img)))
      // console.log(imgeUrls);

      //image upload on mongoDB - 2
      const imageUrls = [];

      for (const img of images){
        const url = await imageUpload(img);
        imageUrls.push(url);
      }

      setImagebbUrl(imageUrls && []);
console.log(imagebbUrl);

      //data POST (upload) mongoDB
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolioData`, {
      method: "POST",
      body: JSON.stringify(data),
    }
  
  );
  const postedResponse = await res.json();
  console.log("POSTED DATA", postedResponse);
  toast.success('Portfolio submitted successfully!')
    }
    catch(error){
      console.error(error);
      toast.error('Failed to submit portfolio.');
    }
    finally{
      setLoading(false);
      setImages([]);
      setTitle('');
      setDescription('');
    }
  }

  if(loading){
    return <Loading/>;
  }

  return (
<>
<div className='h-full flex flex-col justify-center items-center p-5'>{/**parent container*/}

{/* form and media container */}
<div className='w-3xl'
>
<PortfolioTextFields 
title={title} 
description={description}
onTitleChange={setTitle}
onDescriptionChange={setDescription}

/>
<PortfolioMediaUploader 
images={images}
setImages={setImages}
/>

</div>

<div className='w-2xl -z-0'>
<button onClick={handleSubmit} className='w-full'>
  <ButtonFill>Submit</ButtonFill>
</button>
</div>

</div>
</>
);
}
