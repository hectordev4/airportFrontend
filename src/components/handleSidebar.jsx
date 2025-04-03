import { useState } from 'react';
import { useAppService } from '../middleware/Context';

export const useHandleOnClick = () => {
    const [airports, setAirports] = useState([]);
    const [planes, setPlanes] = useState([]);
    const [flights, setFlights] = useState([]);

    const { Services } = useAppService(); // Get services from context

    return {
        airports,
        planes,
        flights,
        handleOnClick: {
            airports: () =>
                Services.airports.getAirports()
                    .then((data) => setAirports(data))
                    .catch((error) => console.error(error)),
            planes: () =>
                Services.planes.getPlanes()
                    .then((data) => setPlanes(data))
                    .catch((error) => console.error(error)),
            flights: () =>
                Services.flights.getFlights()
                    .then((data) => setFlights(data))
                    .catch((error) => console.error(error)),
        },
    };
};
