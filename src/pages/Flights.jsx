import React, { useEffect, useState } from "react";
import { useAppService } from "@/middleware/Context";

const Flights = () => {
  const { Services } = useAppService(); // Access Services from context
  const [flights, setFlights] = useState([]); // Local state for flights

  useEffect(() => {
    // Fetch flights data when the component mounts
    Services.flights.getFlights()
      .then((data) => setFlights(data))
      .catch((error) => console.error("Failed to fetch flights:", error));
  }, [Services]);

  return (
    <div>
      <h2>Flights</h2>
      <ul>
        {flights && flights.length > 0 ? (
          flights.map((flight) => (
            <li key={flight.id}>{flight.flightNumber}</li>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </ul>
    </div>
  );
};

export default Flights;