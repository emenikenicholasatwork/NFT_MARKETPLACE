"use client"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";
import Header from "@/components/Header";
import { GlobalProvider } from "@/global/GlobalContext";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <GlobalProvider>
          <body>
                <Header/>
              <main>{children}</main>
              </body>
      </GlobalProvider>
      </html>
  );
}
