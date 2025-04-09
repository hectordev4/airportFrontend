import { useAppService } from "@/context/AppServiceContext";
import { useLocation } from "react-router-dom";

const pageMethodMap = {
  airport: "Airport",
  plane: "Plane",
  flight: "Flight",
};

export function usePageService() {
  const services = useAppService();
  const location = useLocation();
  const page = location.pathname.split("/").filter(Boolean)[0];
  const methodSuffix = pageMethodMap[page];

  return { services, methodSuffix };
}
