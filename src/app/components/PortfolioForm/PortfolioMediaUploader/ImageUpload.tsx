import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import ButtonFill from '../../Button_fill/ButtonFill';
import { FiXCircle } from "react-icons/fi";

type ImageUploadProps = {imageData: File | null ;
onCancel: () => void;
 };

export default function ImageUpload({imageData, onCancel} : ImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ModalComponent, setModalComponent] = useState<any>(null);

    useEffect(()=>{
        if(imageData){
            const url = URL.createObjectURL(imageData);
            setPreviewUrl(url)

            return () => URL.revokeObjectURL(url);
        }
    }, [imageData])

      // Dynamically import react-modal only on client
  useEffect(() => {
    (async () => {
      const modal = (await import('react-modal')).default;
      modal.setAppElement('body');
      setModalComponent(() => modal);
    })();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
    <div className={`mt-5 ${imageData ? "block" : "hidden"} `}>
<div className='flex flex-col-reverse items-center'>
<div> {/*image text info*/}

<h2>{imageData?.name}</h2>
<p>{imageData ? (imageData?.size / 1024).toFixed(2) : ""} </p>
</div> {/*image text info*/}
    
<div> {/*image | image view*/}
<div>
<button onClick={openModal} style={{ border: 'none', background: 'none', padding: 0 }}>
<Image
  src={previewUrl ?? ""}
  alt={imageData?.name || "Uploaded image"}
  width={200}
  height={200}
  style={{ cursor: 'pointer' }}
/>
</button>
</div>
</div> {/*image | image view*/}
</div>

<div className='mt-5 w-full flex flex-col gap-2'>
  {!modalIsOpen && (
    <>
      <button 
      onClick={onCancel}
      className='w-full'>
        <ButtonFill>Cancel</ButtonFill>
      </button>
      <button className='w-full'>
        <ButtonFill>Upload</ButtonFill>
      </button>
    </>
  )}
</div>

    </div>

         {/* Only render Modal if loaded */}
      {ModalComponent && (
        <ModalComponent
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Preview"
          style={{
            content: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '600px',
              margin: 'auto',
            },
          }}
        >
          <div className=' w-full'>

          <button className='text-3xl hover:text-red-600 duration-700 flex flex-start fixed top-14 left-96' onClick={closeModal} style={{ marginBottom: '1rem' }}>
            <FiXCircle />
          </button>
          </div>
          {previewUrl && (
            <Image
              src={previewUrl}
              alt={imageData?.name || "Uploaded image"}
              width={500}
              height={500}
              style={{ objectFit: 'contain' }}
            />
          )}
        </ModalComponent>
      )}
    </>
  )
}
