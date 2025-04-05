import React, { useEffect, useState } from "react";
import { useAppService } from "@/middleware/Context";
import DataTable from "@/components/DataTable";

const Planes = () => {
  const Services = useAppService();
  const [planes, setPlanes] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchPlanes() {
      try {
        const data = await Services.plane.getPlanes(); // Fetch plane data
        setPlanes(data);

        if (data.length > 0) {
          const generatedColumns = Object.keys(data[0]).map((key) => ({
            accessorKey: key,
            id: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
            enableColumnFilter: true,
            cell: (info) => {
              const value = info.getValue();

              // Handle flightNumbers (which are arrays in the plane data)
              if (key === "flightNumber" && Array.isArray(value)) {
                // Assuming flightNumber is an array, join them into a string
                return value.join(", ") || "No flight number"; // Join flight numbers with commas
              }

              // Handle other arrays (like flights or other related data)
              if (Array.isArray(value)) {
                return value.length > 0 ? value[0]?.flightNumber || "No flight number" : "No flight number";
              }

              // Handle other cases normally
              return value || "N/A"; // Render value or fallback to N/A
            },
          }));
          setColumns(generatedColumns);
        }
      } catch (error) {
        console.error("Failed to fetch planes:", error);
      }
    }

    fetchPlanes();
  }, [Services]);

  return (
    <div>
      <h2>Planes</h2>
      {planes.length > 0 ? (
        <DataTable data={planes} columns={columns} />
      ) : (
        <p>Loading planes...</p>
      )}
    </div>
  );
};

export default Planes;
