import React, { useEffect, useState } from "react";
import { useAppService } from "@/middleware/Context";

const Planes = () => {
  const { getPlanes } = useAppService();
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const data = await getPlanes; // Fetch data
        setPlanes(data); // Update state
        console.log(data);
        
      } catch (error) {
        console.error("Failed to fetch planes:", error);
      }
    };

    fetchPlanes();
  }, [getPlanes]);

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