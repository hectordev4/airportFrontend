import React, { useEffect, useState } from "react";
import { useAppService } from "@/context/AppServiceContext";
import DataTable from "@/components/DataTable";
// import { ButtonForm } from "@/components/Buttons";


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

              // Handle flight departure or arrival flight number arrays
              if (key === 'flightDepartureNumbers' || key === 'flightArrivalNumbers') {
                if (Array.isArray(value) && value.length > 0) {
                  return value.join(', '); // Display all flight numbers in a comma-separated string
                } else {
                  return 'No flight number'; // Fallback if there are no flight numbers
                }
              }

              // Handle other arrays or objects
              if (Array.isArray(value)) {
                return value[0]?.flightNumber || 'No flight number';
              } else if (typeof value === 'object' && value !== null) {
                return JSON.stringify(value); // Could be more specific based on structure
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
