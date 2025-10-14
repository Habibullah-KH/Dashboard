"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import ButtonFill from '../../Button_fill/ButtonFill';
import Modal from '../../modal/Modal';

type ImageUploadProps = {
imageData: File | string | null ;
onCancel: () => void;
 };

export default function ImageUpload({imageData, onCancel} : ImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(()=>{
        if(!imageData) return;

        // if image is a File create a local preview URL
        if(imageData instanceof File){
            const url = URL.createObjectURL(imageData);
            setPreviewUrl(url)

            return () => URL.revokeObjectURL(url);
        }
    }, [imageData])

        // if it's a string use directly
        if(typeof imageData === "string"){
          setPreviewUrl(imageData)
        }

  return (
    <>
    <div className={`${imageData ? "block" : "hidden"}
     flex justify-between items-center p-2 w-full m-2 bg-pink-300/8 rounded-xl
    
    `}>

<div className='flex flex-row-reverse items-center gap-2 '>

<div> {/*image text info*/}
<h2>{imageData?.name ? imageData.name : "it's a preuploaded image"}</h2>
<p>{imageData ? (imageData?.size / 1024).toFixed(2) : ""} KB</p>
</div> {/*image text info end*/}
    
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

<div className='flex items-center gap-2'>
  {!modalIsOpen && (
    <>
      <button 
      onClick={onCancel}
      className='-z-0'>
        <ButtonFill>Cancel</ButtonFill>
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
