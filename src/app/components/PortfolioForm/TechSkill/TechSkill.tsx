"use client";

import React, { useEffect, useState } from "react";
import ButtonBorder from "../../Buttons/Button_border/ButtonBorder";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import IconUpload from "../PortfolioMediaUploader/IconUpload";
import ButtonFill from "../../Button_fill/ButtonFill";
import SkillCard from "./SkillCard";

export interface SkillData {
    skillName: string;
    skillIcon: File[];
}

type propType = {
    addSkill: React.Dispatch<React.SetStateAction<SkillData[]>>;
    skillArray: SkillData[];
};


export default function TechSkill({ addSkill, skillArray }: propType){
  const [skillIcon, setSkillIcon] = useState<File[]>([]);
  const [skillName, setSkillName] = useState('');
  const [isClient, setIsClient] = useState(false);

  const data = {
    skillName: skillName,
    skillIcon: skillIcon
  }

  const onDrop = (acceptedFiles: File[]) => {
 if(acceptedFiles && acceptedFiles.length > 0){
  setSkillIcon(acceptedFiles);
 }
  }

console.log(skillArray);


  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept: {
      "image/jpeg" : [".jpeg", ".jpg"],
      "image/png" : [".png"],
    }  })

  const allowedExtensions = ["jpg", "jpeg", "png"];

  const checkImageFormat = () => {

    for (const image of skillIcon){

      const check = image.name
        .substring(image.name.lastIndexOf(".") + 1)
        .toLowerCase();
  
      if (!allowedExtensions.includes(check)) {
        setSkillIcon([]);
        return toast.error("Please upload a valid image (jpg, jpeg, png)");
      }
    };
    }

  useEffect(() => {
    if (skillIcon) checkImageFormat();
    setIsClient(true);
  }, [skillIcon]);


  if (!isClient) return null;

  function handleSelection () {
    addSkill(prevSkill => [...prevSkill, data]);
    setSkillName('');
    setSkillIcon([]);
  }
  return (
    <>
<h2>Select skill</h2>

 <div className="text-sm p-5 flex items-center justify-center">

<div>
  <form>
{/* skill name */}
  <input 
  className='text-md '
  type="text" 
  id="fname" 
  name="fname"
  placeholder='Title'
  onChange={e => setSkillName(e.target.value)}
  value={skillName}
  />
  </form>
</div>

  {/* image upload section */}
 <div
        {...getRootProps()}
        className={`flex items-center justify-center p-2 rounded-r-2xl`}>
        <input {...getInputProps()} /> {/* handles both click + drag */}

        <img src="/image_icon.png" alt="Upload icon" className="w-5 h-5 mr-2" />

        <div>
          <button>
            <ButtonBorder>upload a icon</ButtonBorder>
          </button>
        </div>
 </div>

{
  skillIcon.length ? 
<div>
{skillIcon.map((image, index) => <IconUpload key={index} imageData={image} onCancel={() => setSkillIcon(skillIcon.filter((_, i) => i != index))}/>)}
</div>

: null
}

{
  skillIcon.length && skillName.length ?
<button 
onClick={handleSelection}
className="w-[100px]">
  <ButtonFill>select</ButtonFill>
</button>
:
null
}

</div>

<div className={`flex gap-2 flex-wrap justify-center mb-2 p-2 rounded-md
  ${skillArray.length === 0 ? 'bg-white' : 'bg-gray-200'}
  `}>

 {
  skillArray.length ?
  skillArray.map((skill, idx) => 
    <SkillCard key={idx} img={skill?.skillIcon} text={skill?.skillName} onCancel={()=>addSkill(skillArray.filter((_, i) => i != idx))}/>
  )
  :
  null
 }
</div>
    </>
  );
}
