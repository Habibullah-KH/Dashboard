import React from 'react'
import ButtonBorder from '../../Buttons/Button_border/ButtonBorder'
import "./media_style.css"
export default function PortfolioMediaUploader() {
  return (
    <>
    <div 
    className='
    border-2 border-red-600 text-sm p-5
     flex items-center justify-center
     '>

    <div className='
    flex items-center justify-center h-[240px] w-full
    image_upload_style
    '>
      <button>
      <ButtonBorder>
        Upload image
      </ButtonBorder>
      </button>
      <span className='pl-2'> or drop a image file</span>
    </div>

    </div>
    </>
  )
}
