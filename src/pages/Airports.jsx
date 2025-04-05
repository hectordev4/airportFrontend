import React, { useEffect, useState } from "react";
import { useAppService } from "@/middleware/Context";
import DataTable from "@/components/DataTable";

const Airports = () => {
  const Services = useAppService();
  const [airports, setAirports] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchAirports() {
      try {
        const data = await Services.airport.getAirports(); // Fetch airport data
        setAirports(data);

        if (data.length > 0) {
          const generatedColumns = Object.keys(data[0]).map((key) => ({
            accessorKey: key, // required!
            id: key, // required for dynamic access
            header: key.charAt(0).toUpperCase() + key.slice(1),
            enableColumnFilter: true,
            cell: (info) => {
              const value = info.getValue();

              // Handle flights or other arrays/objects
              if (Array.isArray(value)) {
                // Example: if flights array exists, show first flight's flightNumber
                const flight = value[0]; // assuming the flight is an object with flightNumber
                return flight?.flightNumber || "No flight number"; // Render flightNumber or fallback text
              } else if (typeof value === "object" && value !== null) {
                // If the value is an object (e.g., flight departure/arrival), handle accordingly
                return JSON.stringify(value); // Could be more specific based on the structure
              }

              return value || "N/A"; // Render other values or fallback to N/A
            },
          }));
          setColumns(generatedColumns);
        }
      } catch (error) {
        console.error("Failed to fetch airports:", error);
      }
    }

    fetchAirports();
  }, [Services]);

  return (
    <div>
      <h2>Airports</h2>
      {airports.length > 0 ? (
        <DataTable data={airports} columns={columns} />
      ) : (
        <p>Loading airports...</p>
      )}
    </div>
  );
};

export default Airports;
