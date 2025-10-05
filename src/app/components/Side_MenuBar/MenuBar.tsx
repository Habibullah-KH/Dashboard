'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ButtonBorder from "../Buttons/Button_border/ButtonBorder";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Auto-focus sidebar when opened
  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      sidebarRef.current.focus();
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Toggle (Hamburger) Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-md"
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
        aria-controls="sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hamburger icon */}
          {!isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          ) : (
            /* X icon when open */
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <nav
        id="sidebar"
        ref={sidebarRef}
        tabIndex={-1}
        className={`fixed top-0 left-0 h-full w-64 p-6 shadow-lg transform transition-transform duration-300 ease-in-out z-40 bg-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3 mt-10">
          <Link
            href="components/PortfolioForm"
            className=" p-3 rounded-md text-center font-medium transition"
            onClick={() => setIsOpen(false)}
          >
            <ButtonBorder>Create Portfolio</ButtonBorder> 
          </Link>

          <Link
            href="/all-portfolio"
            className=" p-3 rounded-md text-center font-medium transition"
            onClick={() => setIsOpen(false)}
          >
            <ButtonBorder>All Portfolio</ButtonBorder>
          </Link>

          <Link
            href="/create-blog"
            className=" p-3 rounded-md text-center font-medium transition"
            onClick={() => setIsOpen(false)}
          >
            <ButtonBorder>Create Blog</ButtonBorder>
          </Link>
        </div>
      </nav>

      {/* Overlay (dark background) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MenuBar;
