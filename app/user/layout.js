import UserHeader from "@/components/user_header/UserHeader";

const layout = ({ children }) => {
  return (
    <main className="min-h-full min-w-full">
      <UserHeader />
      <main className="min-h-full min-w-full">{children}</main>
    </main>
  );
};
export default layout;
