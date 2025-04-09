import Home from "../pages/Home";
import About from "../pages/About";
import Airports from "../pages/Airports";
import Flights from "../pages/Flights";
import Planes from "../pages/Planes";
import { AirportForm } from "../components/forms/AirportForm";
import { FlightForm } from "../components/forms/FlightForm";
import { PlaneForm } from "../components/forms/PlaneForm";

export const routes = [
    {
        path: "/",
        element: () => <Home />,
    },
    {
        path: "/about",
        element: () => <About />,
    },
    {
        path: "/airports",
        element: () => <Airports />,
    },
    {
        path: "/airports/new",
        element: () => <AirportForm />,
    },
    {
        path: "/airports/edit/:id",
        element: () => <AirportForm />,
    },
    {
        path: "/flights",
        element: () => <Flights />,
    },
    {
        path: "/flights/new",
        element: () => <FlightForm />,
    },
    {
        path: "/flights/edit/:id",
        element: () => <FlightForm />,
    },
    {
        path: "/planes",
        element: () => <Planes />,
    },
    {
        path: "/planes/new",
        element: () => <PlaneForm />,
    },
    {
        path: "/planes/edit/:id",
        element: () => <PlaneForm />,
    },
    
]