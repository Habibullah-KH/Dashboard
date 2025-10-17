"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { imageUpload } from '@/app/lib/utils/imageUpload';
import TechSkill, { SkillData } from '@/app/components/PortfolioForm/TechSkill/TechSkill';
import Loading from '@/app/components/Loading/Loading';
import PortfolioTextFields from '@/app/components/PortfolioForm/PortfolioTextFields/PortfolioTextFields';
import PortfolioMediaUploader from '@/app/components/PortfolioForm/PortfolioMediaUploader/PortfolioMediaUploader';
import ButtonFill from '@/app/components/Button_fill/ButtonFill';
import { useParams } from 'next/navigation';


export default function EditForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [liveLink, setLiveLink] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagebbUrl, setImagebbUrl] = useState<string[]>([]);
  const [skill, setSkill] = useState<SkillData[]>([]);
  const [iconUrl, setIconUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);


  useEffect(()=>{
    const fetchPortfolio = async () => {
      try{
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolioID/${id}`);
        const data = await res.json();
        setPortfolio(data);

        setTitle(data?.title || "");
        setDescription(data?.description || "");
        setLiveLink(data.liveLink || '');
        setImages(data.images || "");
        setSkill(data.skills || []);

      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [id]);

  const now = new Date();
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

      const imageUrls = [];
      for (const img of images){
        const url = await imageUpload(img);
        imageUrls.push(url);
      }
      setImagebbUrl(imageUrls);

      const iconUploadPromises = skill.map( async (singleImgData) => {
        const fileToUpload = singleImgData && singleImgData.skillIcon.length > 0 ? singleImgData.skillIcon[0] : null;
        if(fileToUpload){
          return imageUpload( fileToUpload);
        }
    return toast.error('unnable to upload image');
      });

      const iconUrls = await Promise.all(iconUploadPromises);
      setIconUrl(iconUrl.filter(url => url !== '' && url !== null));

  // final object for mongodb
  const data = {
    title:title, 
    description:description, 
    images:imageUrls,
    liveLink:liveLink,
    skills: skill.map((skill, index) => ({
      skillName: skill.skillName,
      skillIcon: iconUrl[index]
    })),

    createdAt: now.toISOString,
    date: now.toLocaleString("en-GB", {
      day: '2-digit', month: 'short', year: 'numeric',
    })

  }

      //data POST (upload) mongoDB
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolioID/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  
  );
  const postedResponse = await res.json();
  console.log("UPDATED DATA", postedResponse);
  toast.success('Portfolio updated successfully!')
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

<div className='md:w-3xl'>

<p className='text-left'>Edit section</p>

{/* form and media container */}
<div className='w-full m'
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

<div className='w-full -z-0'>
<button onClick={handleSubmit} className='w-full'>
  <ButtonFill>Submit</ButtonFill>
</button>
</div>
</div>

</div>
</>
);
}
