import * as React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import { GlobalProvider } from "../context/GlobalContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <GlobalProvider>
      <html lang="en">
        <head>
          <title>Crypto Art</title>
          <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
        </head>
        <body className="min-h-screen">
          {children}
        </body>
      </html>
    </GlobalProvider>
  );
}
