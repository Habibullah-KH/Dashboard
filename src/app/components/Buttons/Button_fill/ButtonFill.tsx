"use client";

import React, { ReactNode } from "react";
import './buttonFill.css'

// 1. Define the props type
interface ButtonFillProps {
  children: ReactNode; // anything React can render
}


const  ButtonFill: React.FC<ButtonFillProps> = ({children}) => {
    return(
        <>
        <div className={`${`button_container`}`}>
        {children}
        </div>
        </>
    );
}

export default  ButtonFill;