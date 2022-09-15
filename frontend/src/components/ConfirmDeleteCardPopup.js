import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCardPopup({ 
  isOpen, 
  onClose, 
  onConfirmDelete, 
  card,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDelete(card);
  }

  return (
    <PopupWithForm
      name="deletion-confirmation"
      title="Вы уверены?"
      ariaLabelButtonText="Да"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    />
  );
}

export default ConfirmDeleteCardPopup;
