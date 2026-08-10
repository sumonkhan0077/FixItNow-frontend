import AboutSection from "@/components/HomePage/AboutSection";
import CategorySection from "@/components/HomePage/CategorySection";
import HeaderSection from "@/components/HomePage/Header";
import ServiceProcess from "@/components/HomePage/ServiceProcess";

import ServicesSection from "@/components/HomePage/ServicesSection";
import TeamSection from "@/components/HomePage/TeamSection";
import TopServicesSection from "@/components/HomePage/TopServices";
import { Navbar } from "@/components/shared/navbar";
import { ServiceItem } from "@/lib/types";
import { getAllServices } from "@/service/customer/services";
import { getMe } from "@/service/getMe";

const page = async () => {
  const res = await getMe();
  
  const response = await getAllServices();

  let servicesList: ServiceItem[] = [];

  if (response && typeof response === "object" && "data" in response) {
    const apiData = response.data;
    if (
      apiData &&
      typeof apiData === "object" &&
      "data" in apiData &&
      Array.isArray(apiData.data)
    ) {
      servicesList = apiData.data;
    } else if (Array.isArray(apiData)) {
      servicesList = apiData;
    }
  }

  const topRatedServices = [...servicesList]
    .sort((a, b) => {
    
      const ratingA = a.technicianProfile?.averageRating || 0;
      const ratingB = b.technicianProfile?.averageRating || 0;
      return ratingB - ratingA;
    })
    .slice(0, 8);
  //   console.log("Backend Response:", res);
  const userProfile = res?.data?.profile || res?.profile || res?.data || null;
  return (
    <div>
      <Navbar user={userProfile}></Navbar>
      <HeaderSection></HeaderSection>
      <AboutSection></AboutSection>
      <ServiceProcess></ServiceProcess>
      <TopServicesSection services={topRatedServices}></TopServicesSection>
      <CategorySection></CategorySection>

      <TeamSection></TeamSection>
      <ServicesSection></ServicesSection>
      {/* <HandymanHoverGallery></HandymanHoverGallery> */}
   
    </div>
  );
};

export default page;
