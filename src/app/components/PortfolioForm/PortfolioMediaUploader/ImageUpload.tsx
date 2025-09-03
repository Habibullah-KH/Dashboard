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
    <div>
        <div> {/*image text info*/}
            <h2>image name</h2>
            <p>size: 20</p>
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
    </>
  )
}
