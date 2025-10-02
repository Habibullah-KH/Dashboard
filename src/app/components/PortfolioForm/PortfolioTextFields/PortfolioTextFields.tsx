import React from 'react'

type propsType = {
  title: string,
  description: string,
  liveLInk: string,
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onLiveLInkChange: (value: string) => void;
}
export default function PortfolioTextFields(
  {title,
  description,
  liveLInk,
  onTitleChange,
  onDescriptionChange,
  onLiveLInkChange
}:propsType)

{
  return (
    <>
    <div className='flex justify-center p-5 '>
<form className='flex flex-col w-full border-b-2 border-gray-300 h-[365px]'>

{/* title */}
  <input 
  className='border-none focus:outline-none text-3xl '
  type="text" 
  id="fname" 
  name="fname"
  value={title}
  onChange={e => onTitleChange(e.target.value)}
  placeholder='Title'
  />

{/* text description */}
  <textarea 
  className='border-none focus:outline-none resize-none '
  id='description'
  name='description'
  rows={12}
  value={description}
  onChange={e => onDescriptionChange(e.target.value)}
  placeholder='Description'
  />

  {/* live link section */}
  <input 
  className='border-none focus:outline-none text-md'
  type="text" 
  id="fname" 
  name="fname"
  value={title}
  onChange={e => onTitleChange(e.target.value)}
  placeholder='Live link'
  />
</form>
    </div>
    </>
  )
}
