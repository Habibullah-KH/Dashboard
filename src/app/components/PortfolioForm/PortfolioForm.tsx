"use client";
import React, { useState } from 'react';
import PortfolioTextFields from './PortfolioTextFields/PortfolioTextFields';
import PortfolioMediaUploader from './PortfolioMediaUploader/PortfolioMediaUploader';
import ButtonFill from '../Button_fill/ButtonFill';

export default function PortfolioForm() {
  const [title, setTitle] = useState('');
  const [description, setdeScription] = useState('');
  const [images, setImages] = useState<File[]>([]);

  console.log(title, description, images);
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
onDescriptionChange={setdeScription}

/>
<PortfolioMediaUploader 
images={images}
setImages={setImages}
/>

</div>

<div className='w-2xl -z-0'>
<button className='w-full'>
  <ButtonFill>Submit</ButtonFill>
</button>
</div>

</div>
</>
);
}
