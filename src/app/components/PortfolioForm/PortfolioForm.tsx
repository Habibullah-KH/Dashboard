"use client";
import React from 'react';
import PortfolioTextFields from './PortfolioTextFields/PortfolioTextFields';
import PortfolioMediaUploader from './PortfolioMediaUploader/PortfolioMediaUploader';
import ButtonFill from '../Button_fill/ButtonFill';

export default function PortfolioForm() {
  return (
<>
<div className='h-full flex flex-col justify-center items-center'>{/**parent container*/}

{/* form and media container */}
<div className='w-3xl'
>
<PortfolioTextFields/>
<PortfolioMediaUploader/>

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
