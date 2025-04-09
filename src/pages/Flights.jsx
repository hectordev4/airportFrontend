import React, { useEffect, useState } from "react";
import { useAppService } from "@/context/AppServiceContext";
import DataTable from "@/components/DataTable";

const Flights = () => {
  const Services = useAppService(); // Access Services from context
  const [flights, setFlights] = useState([]); // Local state for flights
  const [columns, setColumns] = useState([]); // Local state for columns

  useEffect(() => {
    async function fetchFlights() {
      try {
        const data = await Services.flight.getFlights(); // Fetch flight data
        setFlights(data); // Update state with fetched flights

        if (data.length > 0) {
          // Dynamically generate columns based on the first flight object
          const generatedColumns = Object.keys(data[0]).map((key) => {
            let column = {
              accessorKey: key,
              id: key,
              header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the header name
              enableColumnFilter: true,
              cell: (info) => {
                const value = info.getValue();

                // Handle nested objects for departureAirport, arrivalAirport, and plane
                if (key === "departureAirport" && value?.code) {
                  return value.code; // Show departureAirport code
                }
                if (key === "arrivalAirport" && value?.code) {
                  return value.code; // Show arrivalAirport code
                }
                if (key === "plane" && value?.registrationNumber) {
                  return value.registrationNumber; // Show plane registration number
                }

                return value || "N/A"; // Default to N/A if the value is null or undefined
              },
            };
            return column;
          });
          setColumns(generatedColumns); // Set columns dynamically
        }
      } catch (error) {
        console.error("Failed to fetch flights:", error);
      }
    }

    fetchFlights(); // Fetch flights on component mount
  }, [Services]);

  return (
    <div>
      <h1>Flights</h1>
      {flights.length > 0 ? (
        <DataTable data={flights} columns={columns} />
      ) : (
        <p>Loading flights...</p>
      )}
    </div>
  );
};

export default Flights;
