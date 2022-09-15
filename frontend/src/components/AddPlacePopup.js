import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ 
  isOpen, 
  onClose, 
  onAddPlace, 
  isLoadingButtonText,
}) {
  const [formInputsValues, setFormInputsValues] = React.useState({
    name: {
      value: "",
      error: "",
      isValid: true,
    },

    link: {
      value: "",
      error: "",
      isValid: true,
    },
  });

  React.useEffect(() => {
    setFormInputsValues({
      name: {
        value: "",
        error: "",
        isValid: true,
      },
      link: {
        value: "",
        error: "",
        isValid: true,
      },
    });
  }, [isOpen]);

  function handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const validationMessage = target.validationMessage;
    const valid = target.validity.valid;

    setFormInputsValues((prevState) => ({
      ...prevState,
      [name]: { value, error: validationMessage, isValid: valid },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: formInputsValues.name.value,
      link: formInputsValues.link.value,
    });
  }

  return (
    <PopupWithForm
      name="add-new-item"
      title="Новое место"
      ariaLabelButtonText="Создать"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      isLoadingButtonText={isLoadingButtonText}
      onSubmit={handleSubmit}
      isValid={
        formInputsValues.name.isValid &&
        formInputsValues.link.isValid &&
        formInputsValues.name.value !== "" &&
        formInputsValues.link.value !== ""
      }
    >
      <label className="popup__field">
        <input
          required
          className={`popup__input ${
            formInputsValues.name.isValid
              ? "popup__input"
              : "popup__input_type_error"
          }`}
          type="text"
          id="place-name"
          name="name"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={formInputsValues.name.value}
          onChange={handleInputChange}
        />
        <span
          className={`popup__error ${
            formInputsValues.name.isValid
              ? "popup__error"
              : "popup__error_visible"
          }`}
        >
          {formInputsValues.name.error}
        </span>
      </label>
      <label className="popup__field">
        <input
          required
          className={`popup__input ${
            formInputsValues.link.isValid
              ? "popup__input"
              : "popup__input_type_error"
          }`}
          type="url"
          id="place-link"
          name="link"
          placeholder="Ссылка на картинку"
          value={formInputsValues.link.value}
          onChange={handleInputChange}
        />
        <span
          className={`popup__error ${
            formInputsValues.link.isValid
              ? "popup__error"
              : "popup__error_visible"
          }`}
        >
          {formInputsValues.link.error}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
