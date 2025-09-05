import React from 'react'

export default function PortfolioTextFields() {
  return (
    <>
    <div className='flex justify-center p-5 '>
<form className='flex flex-col w-full border-b-2 border-gray-300 h-[365px]'>
  <input 
  className='border-none focus:outline-none text-3xl '
  type="text" 
  id="fname" 
  name="fname"
  placeholder='Title'
  />

  <textarea 
  className='border-none focus:outline-none resize-none '
  id='description'
  name='description'
  rows={12}

  placeholder='Description'
  />
</form>
    </div>
    </>
  )
}
