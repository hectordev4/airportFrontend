import React, { useEffect, useState } from "react";
import { useFlyService } from "@/middleware/Context";

const Airports = () => {
  const { getAirports } = useFlyService();
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirports(); // Fetch data
        setAirports(data); // Update state
      } catch (error) {
        console.error("Failed to fetch airports:", error);
      }
    };

    fetchAirports();
  }, [getAirports]);

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