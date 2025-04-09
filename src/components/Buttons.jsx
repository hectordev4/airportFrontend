import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppService } from "@/context/AppServiceContext";


export function ButtonCreate({ formType }) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(`/${formType}s/new`)}>
      Create
    </Button>
  );
}


export function ButtonUpdate({ formType, rowData }) {
  const navigate = useNavigate();
  const Services = useAppService(); // Access the airport service from context

  const handleUpdateClick = async () => {
    if (rowData && rowData.id) {
      try {
        const airportData = await Services.airport.getById(rowData.id);
        
        if (airportData) {
          navigate(`/${formType}s/edit/${rowData.id}`, {
            state: { airportData },
          });
        } else {
          console.error("Airport data not found for id:", rowData.id);
        }
      } catch (error) {
        console.error("Error fetching airport data:", error);
      }
    } else {
      console.error("ButtonUpdate error: rowData or rowData.id is undefined", rowData);
    }
  };

  return (
    <Button variant="outline" onClick={handleUpdateClick}>
      Update
    </Button>
  );
}



export function ButtonDelete({ rowData }) {
  const Services = useAppService();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    if (!rowData || !rowData.id) {
      console.error("ButtonDelete error: rowData or rowData.id is undefined", rowData);
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this airport?");
    if (!confirmDelete) return;

    try {
      await Services.airport.deleteAirport(rowData.id);
      alert("Airport deleted successfully.");
      navigate(-1);
    } catch (error) {
      console.error("Error deleting airport:", error);
      alert("An error occurred while deleting the airport.");
    }
  };

  return (
    <Button variant="destructive" onClick={handleDeleteClick}>
      Delete
    </Button>
  );
}
