import { createContext, useContext, useState } from "react";
import { FormModal } from "@/components/Modal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("create");
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState(null);

  // Open modal with specific data
  const openModal = ({ action, formType, formData = null }) => {
    setAction(action);
    setFormType(formType);
    setFormData(formData);
    setIsOpen(true);
  };

  // Close modal and reset state
  const closeModal = () => {
    setIsOpen(false);
    setFormType(null);
    setFormData(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <FormModal
        action={action}
        formType={formType}
        formData={formData}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </ModalContext.Provider>
  );
};

