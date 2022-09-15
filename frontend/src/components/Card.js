import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `place__delete-button ${
    isOwn ? "place__delete-button" : "place__delete-button_hide"
  }`;
  
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like-button ${
    isLiked ? "place__like-button_active" : "place__like-button"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="place">
      <a
        className="place__img"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Выразить оценку - нравится"
          />
          <p className="place__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
        aria-label="Удалить"
      />
    </div>
  );
}

export default Card;
