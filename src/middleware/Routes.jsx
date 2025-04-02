import Home from "../pages/Home";
import About from "../pages/About";
import Flights from "../pages/Flights";
import Planes from "../pages/Planes";
import Airports from "../pages/Airports";

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
        path: "/flights",
        element: () => <Flights />,
    },
    {
        path: "/planes",
        element: () => <Planes />,
    },
    {
        path: "/airports",
        element: () => <Airports />,
    },
]