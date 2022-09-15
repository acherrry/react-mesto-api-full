import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        card === null
          ? "popup popup_review-place"
          : "popup popup_review-place popup_is-opened"
      }
    >
      <div className="popup__content popup__content_place">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__img"
          alt={card ? card.name : ""}
          src={card ? card.link : "/"}
        />
        <p className="popup__text">
          {card ? card.name : ""}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;
