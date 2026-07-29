import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const AuthGroupLayout = async ({ children }: { children: React.ReactNode }) => {
//   const res = await getMe();

// //   console.log("Backend Response:", res); 
//   const userProfile = res?.data?.profile || res?.profile || res?.data || null;

  return (
    <div>
      {/* <Navbar user={userProfile} /> */}
      {children}
    </div>
  );
};

export default AuthGroupLayout;