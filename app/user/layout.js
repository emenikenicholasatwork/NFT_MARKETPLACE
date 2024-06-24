import UserHeader from "@/components/header/user_header/UserHeader";

const layout = ({ children }) => {
  return (
    <html>
      <body>
        <UserHeader />
        {children}
      </body>
    </html>
  );
};
export default layout;
