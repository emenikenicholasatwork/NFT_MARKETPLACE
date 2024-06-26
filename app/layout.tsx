"use client"
import * as React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import Header from "../components/header/Header";
import { GlobalProvider } from "../context/GlobalContext";
import Footer from '../components/Footer';

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
        <GlobalProvider>
          <body>
              <Header/>
              <main>{children}</main>
              <Footer/>
              </body>
      </GlobalProvider>
      </html>
  );
}
