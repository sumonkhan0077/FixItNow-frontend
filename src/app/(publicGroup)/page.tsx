import AboutSection from "@/components/HomePage/AboutSection";
import FashionHoverGallery from "@/components/HomePage/cardfaw";
import HandymanHoverGallery from "@/components/HomePage/cardfaw";
import HoverGallery from "@/components/HomePage/cardfaw";
import CategorySection from "@/components/HomePage/CategorySection";
import HeaderSection from "@/components/HomePage/Header";
import ImageSlider from "@/components/HomePage/ImageSlider";
import ServicesSection from "@/components/HomePage/ServicesSection";
import TeamSection from "@/components/HomePage/TeamSection";
import TopServicesSection from "@/components/HomePage/TopServices";
import { Navbar } from "@/components/shared/navbar";
import { getAllServices } from "@/service/customer/services";
import { getMe } from "@/service/getMe";

const page = async () => {
  const res = await getMe();
  
  const response = await getAllServices();

  let servicesList = [];

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
  //   console.log("Backend Response:", res);
  const userProfile = res?.data?.profile || res?.profile || res?.data || null;
  return (
    <div>
      <Navbar user={userProfile}></Navbar>
      <HeaderSection></HeaderSection>
      <AboutSection></AboutSection>
      <CategorySection></CategorySection>
      <TopServicesSection services={servicesList}></TopServicesSection>

      <TeamSection></TeamSection>
      <ServicesSection></ServicesSection>
      {/* <HandymanHoverGallery></HandymanHoverGallery> */}
      {/* <ImageSlider></ImageSlider> */}
    </div>
  );
};

export default page;
