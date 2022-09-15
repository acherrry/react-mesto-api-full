import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  isOpen,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardsElements = cards.map(item =>
      <li key={item._id}>
        <Card
          card={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          isOpen={isOpen}
          onCardDelete={onCardDelete}
        />
      </li>
    );

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <a
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <div className="profile__personal-data">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            />
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>

      <section className="places">
        <ul className="places__list">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
