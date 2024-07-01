import Footer from '../../components/Footer';
import UserHeader from '../../components/header/user_header/UserHeader';
import React from 'react';


const layout = ({ children }: Readonly<{children: React.ReactNode}>) => {
  return (
      <main>
        <UserHeader />
       {children}
       <Footer/>
      </main>
  );
};
export default layout;
