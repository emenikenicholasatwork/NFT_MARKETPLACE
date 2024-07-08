"use client"
import * as React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import { GlobalProvider } from "../context/GlobalContext";
import {Toaster} from "react-hot-toast";

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
        <GlobalProvider>
          <body>
            <Toaster position="bottom-right" reverseOrder={false}/>
            {children}
          </body>
      </GlobalProvider>
      </html>
  );
}
