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
  

  const handleUpdateClick = async () => {
    if (id) {
      try {
        const data = await Services[formType].getById(id);
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


export function ButtonDelete({ formType, id }) {
  const navigate = useNavigate();
  const Services = useAppService();
 

  const handleDeleteClick = async () => {
      if (id) {
        try {
          const response = await Services[formType].deleteById(id);
          if (response) {
            navigate(`/${formType}s`, {
              state: { message: `${formType} deleted successfully` },
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
    <Button variant="destructive" onClick={handleDeleteClick}>
      Delete
    </Button>
  );
}
