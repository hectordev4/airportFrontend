import React, { useEffect, useState } from "react";
import { useAppService } from "@/middleware/Context";

const Flights = () => {
  const Services = useAppService(); // Access Services from context
  const [flights, setFlights] = useState([]); // Local state for flights

  useEffect(() => {
    async function fetchFlights() {
      try {
        const data = await Services.flight.getFlights(); // Fetch data
        setFlights(data); // Update state
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      }
    }

    fetchFlights();
  }, [Services]);

  return (
    <div>
      <h2>Flights</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>{flight.flightNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;