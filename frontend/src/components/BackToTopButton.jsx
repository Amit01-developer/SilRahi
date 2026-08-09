import React, { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(()=>{
    const handleScroll = ()=>{
        if(window.scrollY>300)
            setIsVisible(true);
        else
            setIsVisible(false);
    };
    window.addEventListener("scroll",handleScroll);
  },[])

  const scrollToTop = ()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
  };

  if(!isVisible) return null;

  return (
    <button 
    onClick={scrollToTop}
    type="button"
    aria-label="Back To Top"
    title="Back To Top"
    className="fixed font-bold bottom-6 right-6 z-50 bg-gradient-to-br from-rosewood to-amethyst text-white rounded-full w-[50px] h-[50px] flex justify-center items-center shadow-[0_8px_25px_rgba(128,90,213,0.45)] hover:shadow-[0_10px_35px_rgba(128,90,213,0.6)] transition-all duration-300 hover:scale-105 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-up-icon lucide-arrow-up"
      >
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </svg>
    </button>
  );
};

export default BackToTopButton;
