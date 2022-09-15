import React from "react";
import successfulRegistrationImg from "../images/popup/__registration-img/popupImg-tooltip-ok.svg";
import unSuccessfulRegistrationImg from "../images/popup/__registration-img/popupImg-tooltip-no.svg";

function InfoTooltip({ isOpen, onClose, tooltipImg, tooltipText }) {
  return (
    <div
      className={
        isOpen
          ? "popup popup_type_sign-up popup_is-opened"
          : "popup popup_type_sign-up"
      }
    >
      <div className="popup__content popup__content_info-tooltip">
        <button className="popup__close" type="button" onClick={onClose} />
        {tooltipImg ? (
          <img
            className="popup__registration-img"
            alt="Уведомление о регистрации"
            src={successfulRegistrationImg}
          ></img>
        ) : (
          <img
            className="popup__registration-img"
            alt="Уведомление о регистрации"
            src={unSuccessfulRegistrationImg}
          ></img>
        )}
        <h2 className="popup__title popup__title_info-tooltip">
          {tooltipText}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
