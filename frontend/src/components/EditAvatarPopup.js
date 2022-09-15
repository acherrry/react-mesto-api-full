import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoadingButtonText,
}) {
  const avatarInputRef = React.useRef("");
  const [isInputValid, setIsInputValid] = React.useState(true);
  const [isButonActive, setIsButonActive] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState("");

  function checkFormValidation(e) {
    if (e.target.validity.valid) {
      setIsInputValid(true );
    } else {
      setIsInputValid(false);
      setValidationErrorMessage(e.target.validationMessage);
    }
    setIsButonActive(e.target.validity.valid && (avatarInputRef.current.value !== ''));
  }

  React.useEffect(() => {
    avatarInputRef.current.value = "";
    setIsInputValid(true);
    setIsButonActive(false);
    setValidationErrorMessage("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }
  
  return (
    <PopupWithForm
      name="update-avatar-form"
      title="Обновить аватар"
      ariaLabelButtonText="Сохранить"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onUpdateAvatar={handleSubmit}
      isLoadingButtonText={isLoadingButtonText}
      onSubmit={handleSubmit}
      isValid={isButonActive}
    >
      <label className="popup__field">
        <input
          required
          className={`popup__input ${
            isInputValid 
              ? "popup__input" 
              : "popup__input_type_error"
          }`}
          type="url"
          id="user-photo-link"
          name="user-photo-link"
          placeholder="Ссылка на новый аватар"
          ref={avatarInputRef}
          onChange={checkFormValidation}
        />
        <span
          className={`popup__error ${
            isInputValid 
              ? "popup__error" 
              : "popup__error_visible"
          }`}
        >
          {validationErrorMessage}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
