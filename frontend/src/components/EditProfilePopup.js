import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoadingButtonText,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [formInputsValues, setFormInputsValues] = React.useState({
    name: {
      value: "",
      error: "",
      isValid: true,
    },
    info: {
      value: "",
      error: "",
      isValid: true,
    },
  });

  React.useEffect(() => {
    setFormInputsValues({
      name: {
        value: currentUser.name,
        error: "",
        isValid: true,
      },
      info: {
        value: currentUser.about,
        error: "",
        isValid: true,
      },
    });
  }, [currentUser, isOpen]);

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

    onUpdateUser({
      name: formInputsValues.name.value,
      about: formInputsValues.info.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      ariaLabelButtonText="Сохранить"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onUpdateUser={handleSubmit}
      isLoadingButtonText={isLoadingButtonText}
      onSubmit={handleSubmit}
      isValid={
        formInputsValues.name.isValid && 
        formInputsValues.info.isValid && 
        formInputsValues.name.value !== "" &&
        formInputsValues.info.value !== ""}
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
          id="user-name"
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
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
            formInputsValues.info.isValid
              ? "popup__input"
              : "popup__input_type_error"
          }`}
          type="text"
          id="user-info"
          name="info"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          value={formInputsValues.info.value}
          onChange={handleInputChange}
        />
        <span
          className={`popup__error ${
            formInputsValues.info.isValid
              ? "popup__error"
              : "popup__error_visible"
          }`}
        >
          {formInputsValues.info.error}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
