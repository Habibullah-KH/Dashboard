import React from 'react'

export default function PortfolioTextFields() {
  return (
    <>
    <div className='flex justify-center'>
<form className='flex flex-col  border-2 border-amber-300'>
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
  rows={15}

  placeholder='Description'
  />
</form>
    </div>
    </>
  )
}
