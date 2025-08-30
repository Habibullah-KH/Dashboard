import React from 'react'

export default function PortfolioTextFields() {
  return (
    <>
    <div className='flex justify-center p-5 border-2 border-red-300'>
<form className='flex flex-col w-full border-2 border-amber-300'>
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
