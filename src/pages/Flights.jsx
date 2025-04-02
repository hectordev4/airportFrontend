import React, { useEffect, useState } from "react";
import { useFlyService } from "@/middleware/Context";

const Flights = () => {
  const { getFlights } = useFlyService();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights(); // Fetch data
        setFlights(data); // Update state
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      }
    };

    fetchFlights();
  }, [getFlights]);

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