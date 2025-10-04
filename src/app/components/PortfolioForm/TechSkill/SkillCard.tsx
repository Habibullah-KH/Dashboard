import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import Loading from '../../Loading/Loading';
import './skill.css'
import { FiX } from "react-icons/fi";

type SkillCardProps = {
    img: File[]; 
    text: string;
    onCancel: () => void;
}

export default function SkillCard({img, text, onCancel}: SkillCardProps) {
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
        useEffect(()=>{

            const file = img && img.length > 0 ? img[0] : null
    
            if(img){
                const url = URL.createObjectURL(file);
                setPreviewUrl(url)
    
                return () => URL.revokeObjectURL(url);
            }
        }, [img])
  return (
    <>
    <div className='border-2 hover:border-transparent duration-300 flex rounded-md pr-2 w-fit'>
        {
            previewUrl?
            <div className='skill-card'>
            <Image 
                src={previewUrl}
                alt={`${text} || icon`}
                width={20}         
                height={20} 
                
            />
            <p>{text}</p>
        </div>
                :

            <Loading/>    
    }

      <button 
      onClick={onCancel}
      className='-z-0 rounded-full duration-300 hover:text-red-500 font-bold hover:font-extrabold'>
        <FiX />
      </button>
      </div>
    </>
  )
}