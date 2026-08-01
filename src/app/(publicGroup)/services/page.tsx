import { ServiceItem } from "@/lib/types";
import { getAllServices } from "@/service/customer/services";
import ServicesShow from "./_components/ServicesShow";

import ServicesTopSection from "./_components/ServicesTopSection";

const ServicesPage = async () => {
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

  return (
    <div className=" ">
     
     <ServicesTopSection></ServicesTopSection>

      {/* --- Services Content Section --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <ServicesShow services={servicesList}></ServicesShow>
      </div>
    </div>
  );
};

export default ServicesPage;