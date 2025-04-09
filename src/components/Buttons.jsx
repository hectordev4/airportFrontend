import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


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

  return (
    <Button
      variant="outline"
      onClick={() => navigate(`/${formType}s/edit/${rowData.id}`)}
    >
      Update
    </Button>
  );
}


export function ButtonDelete({ onDelete }) {
  return (
    <Button variant="destructive" onClick={onDelete}>
      Delete
    </Button>
  );
}
