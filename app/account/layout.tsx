"use client"
import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import ProtectedRoute from '../../context/ProtectedRoutes';


const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { isNightMode } = useGlobal();
  return (
    <ProtectedRoute>
      <main className={`${isNightMode ? "bg-[#252927]  text-white" : "bg-white text-black"} duration-300`}>{children}</main>
    </ProtectedRoute>
  );
};
export default layout;
