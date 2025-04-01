import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { FlyServiceProvider } from "./middleware/Context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Flights from "./pages/Flights";
import Planes from "./pages/Planes";
import Airports from "./pages/Airports";

function App() {
  return (
    <FlyServiceProvider>
      <Router> {/* Added Router here */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/airports" element={<Airports />} />
          </Routes>
        </SidebarProvider>
      </Router> {/* Closed Router here */}
    </FlyServiceProvider>
  );
}

export default App;
