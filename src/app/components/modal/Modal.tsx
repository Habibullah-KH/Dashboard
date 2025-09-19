"use client";
import React from 'react'

type ModalProps = {
  open: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
}
export default function Modal({open, onClose, children} : ModalProps) {
    console.log(open)
  return (
    <>
    <div
    onClick={onClose}
    className={`z-50 fixed flex inset-0 items-center justify-center transition-colors
    ${open ? 'visible bg-black' : 'invisible'}
    `}>
        {
          children
        }

    </div>
    </>
  )
}
