
import HeaderSection from '@/components/HomePage/Header';
import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getMe';

const page = async () => {
  const res = await getMe();
  
  //   console.log("Backend Response:", res); 
    const userProfile = res?.data?.profile || res?.profile || res?.data || null;
  return (
    <div>
      <Navbar user={userProfile}></Navbar>
      <HeaderSection></HeaderSection>
    </div>
  );
};

export default page;