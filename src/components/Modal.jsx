import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AirportForm } from "./forms/AirportForm";
import { FlightForm } from "./forms/FlightForm";
import { PlaneForm } from "./forms/PlaneForm";


function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


export function FormModal({ action, formData, isOpen, onClose, formType }) {
  const handleClose = () => {
    onClose(); // Context handles reset
  };

  const renderForm = () => {
    switch (formType) {
      case 'airport':
        return action === 'create'
          ? <AirportForm onClose={handleClose} />
          : <AirportForm initialData={formData} onClose={handleClose} />;
      case 'flight':
        return action === 'create'
          ? <FlightForm onClose={handleClose} />
          : <FlightForm initialData={formData} onClose={handleClose} />;
      case 'plane':
        return action === 'create'
          ? <PlaneForm onClose={handleClose} />
          : <PlaneForm initialData={formData} onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            {action === "update"
              ? `Update ${formType ? capitalize(formType) : "Unknown"}`
              : `Create ${formType ? capitalize(formType) : "Unknown"}`}
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>{renderForm()}</Dialog.Body>
        <Dialog.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}


