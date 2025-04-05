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

              // If the value is an array (such as 'flight'), handle it
              if (Array.isArray(value)) {
                // Assuming the first element in the array has the flightNumber
                const flight = value[0]; // Access the first flight
                return flight?.flightNumber || "No flight number"; // Render flightNumber or a fallback text
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
