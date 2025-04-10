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


export function ButtonUpdate({ formType, id }) {
  const navigate = useNavigate();
  const Services = useAppService();
  const DynamicService = Services[formType].getById(id);

  const handleUpdateClick = async () => {
    if (id) {
      try {
        const data = await DynamicService;
        if (data) {
          navigate(`/${formType}s/edit/${id}`, {
            state: { data },
          });
        } else {
          console.error(`${formType} data not found for id:`, id);
        }
      } catch (error) {
        console.error(`Error fetching ${formType} data:`, error);
      }
    } else {
      console.error("ButtonUpdate error: id is undefined");
    }
  };

  return (
    <Button variant="outline" onClick={handleUpdateClick}>
      Update
    </Button>
  );
}


export function ButtonDelete({ id }) {
  const Services = useAppService();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    if (!id) {
      console.error("ButtonDelete error: id is undefined");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this airport?");
    if (!confirmDelete) return;

    try {
      await Services.airport.deleteAirport(id);
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
