"use client";

import React, { ReactNode } from "react";
import "./buttonBorder.css";

// 1. Define the props type
interface ButtonBorderProps {
  children: ReactNode; // anything React can render
}

const ButtonBorder: React.FC<ButtonBorderProps> = ({ children }) => {
  return (
    <button
      className={`${'btn-border'}`}
      type="button" 
    >
      {children}
    </button>
  );
};

export default ButtonBorder;
