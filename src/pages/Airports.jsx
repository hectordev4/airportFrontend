import React, { useEffect, useState } from "react";
import { useAppService } from "@/middleware/Context";

const Airports = () => {
  const { Services } = useAppService(); // Access Services from context
  const [airports, setAirports] = useState([]); // Local state for airports

  useEffect(() => {
    // Fetch airports data when the component mounts
    Services.airports.getAirports()
      .then((data) => setAirports(data))
      .catch((error) => console.error("Failed to fetch airports:", error));
  }, [Services]);

  return (
    <div>
      <h2>Airports</h2>
      <ul>
        {airports && airports.length > 0 ? (
          airports.map((airport) => (
            <li key={airport.id}>{airport.name}</li>
          ))
        ) : (
          <p>No airports available.</p>
        )}
      </ul>
    </div>
  );
};

export default Airports;