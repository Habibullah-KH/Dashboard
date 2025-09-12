import Image from 'next/image'
import React from 'react'

export default function ImageCard({value, saveValue, addValue, clearValue}) {
    console.log(value);
    if (!value) return null; 
  return (
    <>
    <div>
  <Image
        src={value}
        alt='protfolio image'
        width={200}
        height={200}
        style={{cursor: 'pointer'}}
        />
    </div>
    </>
  )
}
