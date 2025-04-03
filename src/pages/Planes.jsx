import React from "react";
import { useAppService } from "@/middleware/Context";

const Planes = () => {
  const { planes } = useAppService(); // Access planes data from context

  return (
    <div>
      <h2>Planes</h2>
      <ul>
        {planes && planes.length > 0 ? (
          planes.map((plane) => (
            <li key={plane.id}>{plane.model}</li>
          ))
        ) : (
          <p>No planes available.</p>
        )}
      </ul>
    </div>
  );
};

export default Planes;