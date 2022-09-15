import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  children,
  name,
  title,
  ariaLabelButtonText,
  isLoadingButtonText,
  onSubmit,
  isValid,
}) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_is-opened`
          : `popup popup_type_${name}`
      }
    >
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          onSubmit={onSubmit}
          name={name}
          noValidate
        >
          {children}
          <button
            className={`popup__save ${
              isValid ? "popup__save" : "popup__save_disabled"}`}
            disabled={!isValid}
            type="submit"
            aria-label={ariaLabelButtonText}
          >
            {isLoadingButtonText ? "Сохранение..." : ariaLabelButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
