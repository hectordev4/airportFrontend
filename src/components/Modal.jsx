// components/Modal.jsx
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AirportForm } from "./forms/AirportForm";
import { FlightForm } from "./forms/FlightForm";
import { PlaneForm } from "./forms/PlaneForm";

export function FormModal({ action, formData, isOpen, onClose, formType }) {
  const [formAction, setFormAction] = useState(action);  // 'create' or 'update'

  const handleClose = () => {
    onClose();
    setFormAction('create');  // Reset form action on close
  };

  const renderForm = () => {
    switch (formType) {
      case 'airport':
        return formAction === 'create' ? <AirportForm onClose={handleClose} /> : <AirportForm initialData={formData} onClose={handleClose} />;
      case 'flight':
        return formAction === 'create' ? <FlightForm onClose={handleClose} /> : <FlightForm initialData={formData} onClose={handleClose} />;
      case 'plane':
        return formAction === 'create' ? <PlaneForm onClose={handleClose} /> : <PlaneForm initialData={formData} onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            {formAction === "update"
              ? `Update ${
                  formType
                    ? formType.charAt(0).toUpperCase() + formType.slice(1)
                    : "Unknown"
                }`
              : `Create ${
                  formType
                    ? formType.charAt(0).toUpperCase() + formType.slice(1)
                    : "Unknown"
                }`}
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
