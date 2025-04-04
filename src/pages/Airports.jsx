import React, { useEffect, useState } from "react";
import { useAppService } from "@/middleware/Context";

const Airports = () => {
  const Services = useAppService(); // Access Services from context
  const [airports, setAirports] = useState([]); // Local state for airports

  useEffect(() => {
    async function fetchAirports() {
      try {
        const data = await Services.airport.getAirports(); // Fetch data
        setAirports(data); // Update state
      } catch (error) {
        console.error("Failed to fetch airports:", error);
      }
    }

    fetchAirports();
  }, [Services]);

  return (
    <div>
      <h2>Airports</h2>
      <ul>
        {airports.map((airport) => (
          <li key={airport.id}>{airport.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Airports;