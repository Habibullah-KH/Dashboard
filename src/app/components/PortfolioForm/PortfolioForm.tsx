"use client";
import React, { useState } from 'react';
import PortfolioTextFields from './PortfolioTextFields/PortfolioTextFields';
import PortfolioMediaUploader from './PortfolioMediaUploader/PortfolioMediaUploader';
import ButtonFill from '../Button_fill/ButtonFill';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { imageUpload } from '@/app/lib/utils/imageUpload';
import TechSkill, {SkillData} from './TechSkill/TechSkill';


export default function PortfolioForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [liveLink, setLiveLink] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagebbUrl, setImagebbUrl] = useState<string[]>([]);
  const [skill, setSkill] = useState<SkillData[]>([]);
  const [iconUrl, setIconUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  const checkUrl = () => {
    let parseUrl;
     try{
      parseUrl = new URL(liveLink);
     }
    catch (error){
    toast.error('please put valide url');
    return false;
    }

    const isValidProtocol = parseUrl.protocol === "http:" || parseUrl.protocol === "https:"

    if(!isValidProtocol){
      toast.error("URL must start with http:// or https://")
    }

  return isValidProtocol;
  }

  const handleSubmit = async() => {
    if(!title ||
       !description ||
       images.length === 0 ||
       !liveLink ||
       skill.length === 0
      ){
      return toast.error('Please fill the form properly');
    }

    if(!checkUrl()){
      return;
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

      const iconUploadPromises = skill.map( async (singleImgData) => {
        const fileToUpload = singleImgData && singleImgData.skillIcon.length > 0 ? singleImgData.skillIcon[0] : null;
        if(fileToUpload){
          return imageUpload( fileToUpload);
        }
    return toast.error('unnable to upload image');
      });

      const iconUrls = await Promise.all(iconUploadPromises);
      setIconUrl(iconUrl.filter(url => url !== ''));

  // final object for mongodb
  const data = {
    title:title, 
    description:description, 
    images:imagebbUrl,
    liveLink:liveLink,
    skills: skill.map((skill, index) => ({
      skillName: skill.skillName,
      skillIcon: iconUrl[index]
    }))

  }

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
      return toast.error('Failed to submit portfolio.');
    }
    finally{
      setLoading(false);
      setImages([]);
      setTitle('');
      setDescription('');
      setSkill([]);
      setLiveLink('');
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
liveLInk={liveLink}
onTitleChange={setTitle}
onDescriptionChange={setDescription}
onLiveLInkChange={setLiveLink}

/>
<PortfolioMediaUploader 
images={images}
setImages={setImages}
/>

<TechSkill
skillArray={skill}
addSkill={setSkill}
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
