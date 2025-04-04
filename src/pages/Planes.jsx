import React, { useEffect, useState } from "react";
import { useAppService } from "@/middleware/Context";

const Planes = () => {
  const Services = useAppService();
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    async function fetchPlanes() {
      try {
        const data = await Services.plane.getPlanes(); // Fetch data
        setPlanes(data); // Update state
      } catch (error) {
        console.error("Failed to fetch planes:", error);
      }
    };

    fetchPlanes();
  }, [Services]);

  return (
    <div>
      <h2>Planes</h2>
      <ul>
        {planes.map((plane) => (
          <li key={plane.id}>{plane.model}</li>
        ))}
      </ul>
    </div>
  );
};

export default Planes;