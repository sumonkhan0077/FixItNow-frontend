import { getMyServices } from "@/service/technician/serviceActions";
import { ServicesClient } from "../_components/services-client";

export default async function ServicesPage() {
  const res = await getMyServices();
  const services = res?.success ? res.data : [];

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
      <ServicesClient initialServices={services} />
    </div>
  );
}
