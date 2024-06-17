import UserHeader from "@/components/header/user_header/UserHeader";

const layout = ({ children }) => {
  return (
    <main className="min-h-full min-w-full">
      <UserHeader />
      <main className="min-h-screen min-w-full pt-20">{children}</main>
    </main>
  );
};
export default layout;
