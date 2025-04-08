// components/Buttons.jsx
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormModal } from "./Modal";

// Button for creating a new entity (airport, flight, plane)
export function ButtonCreate({ formType }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <>
      <Button onClick={openModal}>Create</Button>
      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} action="create" formType={formType} />
    </>
  );
}

// Button for updating an entity (airport, flight, plane)
export function ButtonUpdate({ formType, rowData }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <>
      <Button onClick={openModal} variant="outline">Update</Button>
      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} action="update" formData={rowData} formType={formType} />
    </>
  );
}

// Button for deleting an entity
export function ButtonDelete() {
  const handleDelete = () => {
    // Your delete logic here
  };

  return <Button variant="destructive" onClick={handleDelete}>Delete</Button>;
}
