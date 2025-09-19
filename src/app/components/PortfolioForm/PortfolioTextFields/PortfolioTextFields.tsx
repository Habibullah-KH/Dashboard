import React from 'react'

type propsType = {
  title: string,
  description: string,
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}
export default function PortfolioTextFields(
  {title,
  description,
  onTitleChange,
  onDescriptionChange
}:propsType)

{
  return (
    <>
    <div className='flex justify-center p-5 '>
<form className='flex flex-col w-full border-b-2 border-gray-300 h-[365px]'>
  <input 
  className='border-none focus:outline-none text-3xl '
  type="text" 
  id="fname" 
  name="fname"
  value={title}
  onChange={e => onTitleChange(e.target.value)}
  placeholder='Title'
  />

  <textarea 
  className='border-none focus:outline-none resize-none '
  id='description'
  name='description'
  rows={12}
  value={description}
  onChange={e => onDescriptionChange(e.target.value)}
  placeholder='Description'
  />
</form>
    </div>
    </>
  )
}
