"use client"
import React from 'react';
import { useGlobal } from '../../context/GlobalContext';


const layout = ({ children }: Readonly<{children: React.ReactNode}>) => {
  const {isNightMode} = useGlobal();
  return (
      <section className={`${isNightMode ? "bg-[#252927]  text-white" : "bg-white text-black"} duration-300`}>{children}</section>
  );
};
export default layout;
