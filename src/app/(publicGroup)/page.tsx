
import AboutSection from '@/components/HomePage/AboutSection';
import CategorySection from '@/components/HomePage/CategorySection';
import HeaderSection from '@/components/HomePage/Header';
import TeamSection from '@/components/HomePage/TeamSection';
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
      <CategorySection></CategorySection>
      <AboutSection></AboutSection>

      <TeamSection></TeamSection>
    </div>
  );
};

export default page;