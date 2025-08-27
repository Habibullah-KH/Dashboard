import React from 'react';
import PortfolioTextFields from './PortfolioTextFields/PortfolioTextFields';
import PortfolioMediaUploader from './PortfolioMediaUploader/PortfolioMediaUploader';

export default function PortfolioForm() {
  return (
<>
<div className='h-screen flex justify-center items-center'>{/**parent container*/}

{/* form and media container */}
<div
className='md:flex justify-center'
>
<PortfolioTextFields/>
<PortfolioMediaUploader/>
</div>
</div>
</>
);
}
