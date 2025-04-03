import React from "react";
import { useAppService } from "@/middleware/Context";

const Flights = () => {
  const { flights } = useAppService(); // Assume flights are already fetched and stored in context

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