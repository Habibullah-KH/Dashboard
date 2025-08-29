import React from 'react'
import ButtonBorder from '../../Buttons/Button_border/ButtonBorder'

export default function PortfolioMediaUploader() {
  return (
    <>
    <div className='border-2 border-red-600 w-[347px] flex flex-col items-center justify-center '>

    <div>
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
