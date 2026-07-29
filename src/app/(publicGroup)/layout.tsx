import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const res = await getMe();
  
  //   console.log("Backend Response:", res); 
    const userProfile = res?.data?.profile || res?.profile || res?.data || null;

  return (
    <>
   <Navbar user={userProfile}></Navbar>
      {children}
    </>
  );
}