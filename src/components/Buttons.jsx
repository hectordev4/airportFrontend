import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppService } from "@/context/AppServiceContext";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateClick = async () => {
    if (!id) {
      console.error("ButtonUpdate error: id is undefined");
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await Services[formType].getById(id);
      if (data) {
        navigate(`/${formType}s/edit/${id}`, { state: { data } });
      } else {
        console.error(`${formType} data not found for id:`, id);
        navigate(`/${formType}s`, {
          state: { 
            message: `${formType} not found`,
            type: 'error'
          }
        });
      }
    } catch (error) {
      console.error(`Error fetching ${formType} data:`, error);
      navigate(`/${formType}s`, {
        state: { 
          message: `Error loading ${formType}: ${error.message}`,
          type: 'error'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleUpdateClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Update'}
    </Button>
  );
}


export function ButtonDelete({ formType, id }) {
  const navigate = useNavigate();
  const Services = useAppService();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    if (!id) {
      alert("Error: Missing ID");
      return;
    }

    if (!window.confirm(`Delete this ${formType}?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      // Check for dependent flights if airport
      if (formType === 'airport') {
        const flights = await Services.flight.getByAirport(id);
        if (flights?.length > 0) {
          alert(`Cannot delete: ${flights.length} flights use this airport`);
          return;
        }
      }

      // Delete the item
      await Services[formType].deleteById(id);
      
      // Success - refresh page
      navigate(`/${formType}s`, { 
        state: { message: `${formType} deleted` },
        replace: true 
      });
      window.location.reload();

    } catch (error) {
      alert(`Failed to delete ${formType}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="destructive"
      size="sm"
      onClick={handleDeleteClick}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}