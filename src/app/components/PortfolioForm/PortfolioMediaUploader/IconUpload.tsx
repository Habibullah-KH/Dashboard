"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Modal from '../../modal/Modal';
import { FiX } from "react-icons/fi";

type iconUpload = {imageData: File | null ;
onCancel: () => void;
 };

export default function IconUpload({imageData, onCancel} : iconUpload) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);;

    useEffect(()=>{

        if(imageData){
            const url = URL.createObjectURL(imageData);
            setPreviewUrl(url)

            return () => URL.revokeObjectURL(url);
        }
    }, [imageData])


  return (
    <>
    <div className={`${imageData ? "block" : "hidden"}
     relative flex items-center p-2 m-2 rounded-xl w-fit
    
    `}>

<div className='flex flex-row-reverse items-center gap-2 '>
    
<div> {/*image | image view*/}
<div>
<button
className='flex'
style={{ border: 'none', background: 'none', padding: 0 }}>
  {previewUrl && (
<Image
  onClick={ () => setModalIsOpen(true)}
  src={previewUrl}
  alt={imageData?.name || "Uploaded image"}
  width={50}
  height={50}
  style={{ cursor: 'pointer', borderRadius: '10px', height: '50px', width: '50px'}}
/>
  )}

</button>
</div>
</div> {/*image | image view end*/}
</div>

<div className='absolute flex items-center gap-2 top-0 right-0'>
  {!modalIsOpen && (
    <>
      <button 
      onClick={onCancel}
      className='-z-0 rounded-full hover:bg-red-200 duration-300'>
        <FiX />
      </button>

    </>
  )}
</div>

{
  previewUrl && (
  <Modal open={modalIsOpen} onClose={()=> setModalIsOpen(false)}>
  <Image
  src={previewUrl}
  alt={imageData?.name || "Uploaded image"}
  width={300}
  height={300}
  style={{ objectFit: 'contain'}}
/>
  </Modal>
  )
  }
 </div> 
    </>
  )
}
