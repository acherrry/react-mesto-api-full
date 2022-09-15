import React from "react";
import "../index.css";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as Auth from "../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmDeleteCard, setIsConfirmDeleteCard] = React.useState(false);
  const [isLoadingButtonText, setIsLoadingButtonText] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  console.log(loggedIn);
  const [email, setEmail] = React.useState("");
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [tooltipImg, setTooltipImg] = React.useState(false);
  const [tooltipText, setTooltipText] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");

      Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsArray]) => {
        console.log(cardsArray);
        setCurrentUser(userData);
        setCards(cardsArray.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn, history]);
  
  React.useEffect(() => {
      Auth.getContent()
        .then((res) => {
        setEmail(res.email);
        setLoggedIn(true);
      })
      .catch(err => {
        console.log(`${err}`);
      });
  }, [history]);

  const onLogin = (data) => {
    setEmail(data.email);
    Auth.authorize(data)
    .then((res) => {
      setLoggedIn(true);
      return res;
    })
    .catch((err) => console.log(err));
}

  const onRegister = (data) => {
    setIsInfoTooltip(true);
    Auth.register(data)
      .then((res) => {
        setTooltipImg(true);
        setTooltipText("Вы успешно зарегистировались!");
        history.push("/signin");
        return res;
      })
      .catch(() => {
        setTooltipText("Что-то пошло не так! Попробуйте еще раз.");
        setTooltipImg(false);
      });
  };

  const onSignOut = () => {
    Auth.loginOut()
      .then((res) => {
        setLoggedIn(false);
        history.push("/signin");
        return res;
      })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .putSettingLike(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((d) => (card._id !== d._id ? d : null))
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfoObject) {
    setIsLoadingButtonText(true);
    api
      .patchProfileEditing(userInfoObject)
      .then((userInfoObject) => {
        setCurrentUser(userInfoObject);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoadingButtonText(false);
        }, 300);
      });
  }

  function handleUpdateAvatar(userAvatarObject) {
    setIsLoadingButtonText(true);
    api
      .patchEditingUserAvatar(userAvatarObject)
      .then((userAvatarObject) => {
        setCurrentUser(userAvatarObject);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoadingButtonText(false);
        }, 300);
      });
  }

  function handleAddPlaceSubmit(nameAndLinkObject) {
    setIsLoadingButtonText(true);
    api
      .postAddingNewCard(nameAndLinkObject)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoadingButtonText(false);
        }, 300);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteConfirmCard(cardItem) {
    setIsConfirmDeleteCard(true);
    setCardToDelete(cardItem);
  }

  function handleCardClick(cardItem) {
    setSelectedCard(cardItem);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeleteCard(false);
    setSelectedCard(null);
    setIsInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header 
            loggedIn={loggedIn} 
            onSignOut={onSignOut} 
            email={email} 
          />

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleDeleteConfirmCard}
              cards={cards}
              onCardLike={handleCardLike}
            />

            <Route path="/signin">
              <Login onLogin={onLogin} />
            </Route>

            <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          <Footer />
        </div>

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          tooltipText={tooltipText}
          tooltipImg={tooltipImg}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoadingButtonText={isLoadingButtonText}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoadingButtonText={isLoadingButtonText}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoadingButtonText={isLoadingButtonText}
        />

        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeleteCard}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
          card={cardToDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
