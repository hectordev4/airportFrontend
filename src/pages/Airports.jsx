import React from "react";
import { useAppService } from "@/middleware/Context";

const Airports = () => {
  const { airports } = useAppService(); // Access airports data from context

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