import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type ImageUploadProps = {imageData: File | null ; };

export default function ImageUpload({imageData} : ImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(()=>{
        if(imageData){
            const url = URL.createObjectURL(imageData);
            setPreviewUrl(url)

            return () => URL.revokeObjectURL(url);
        }
    }, [imageData])
console.log(previewUrl);
  return (
    <>
    <div className={` mt-5 ${imageData ? "block" : "hidden"} `}>
<div className='flex flex-col-reverse items-center'>
<div> {/*image text info*/}

<h2>{imageData?.name}</h2>
<p>{imageData ? (imageData?.size / 1024).toFixed(2) : ""} </p>
</div> {/*image text info*/}
    
<div> {/*image | image view*/}
<div>
<Image 
  src={previewUrl ?? ""} 
  alt={imageData?.name || "Uploaded image"} 
  width={200} 
  height={200} 
/>
</div>
</div> {/*image | image view*/}
</div>

<div className='mt-5'>
  <button>
    Cancel
  </button>

  <button>
    Upload
  </button>
</div>

    </div>
    </>
  )
}
