import UserHeader from '../../components/header/user_header/UserHeader';
import React from 'react';


const layout = ({ children }: Readonly<{children: React.ReactNode}>) => {
  return (
    <html>
      <body>
        <UserHeader />
        <main>{children}</main>
      </body>
    </html>
  );
};
export default layout;
