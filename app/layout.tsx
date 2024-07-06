"use client"
import * as React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import { GlobalProvider } from "../context/GlobalContext";

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
        <GlobalProvider>
          <body>
            {children}
          </body>
      </GlobalProvider>
      </html>
  );
}
