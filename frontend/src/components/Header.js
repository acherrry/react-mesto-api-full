import React from "react";
import logo from "../images/header/__logo/header-logo.svg";
import { Switch, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  const [burgerMenuIsOpened, setBurgerMenuIsOpened] = React.useState(false);

  function handleBurgerButtonClick() {
    setBurgerMenuIsOpened(!burgerMenuIsOpened);
  }

  return (
    <header className="header">
      <img className="header__logo" alt="Логотип сервиса Mesto" src={logo} />
      <Switch>
        <Route path="/signin">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
        <Route path="/signup">
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <>
            <button
              className={`header__menu-burger ${
                burgerMenuIsOpened
                  ? "header__menu-burger"
                  : "header__menu-burger_opened"
              }`}
              type="button"
              aria-label="Открыть меню"
              onClick={handleBurgerButtonClick}
            >
              <span
                className={`header__menu-line ${
                  burgerMenuIsOpened
                    ? "header__menu-line_rotate"
                    : "header__menu-line"
                }`}
              ></span>
              <span
                className={`header__menu-line ${
                  burgerMenuIsOpened
                    ? "header__menu-line_hide"
                    : "header__menu-line"
                }`}
              ></span>
              <span
                className={`header__menu-line ${
                  burgerMenuIsOpened
                    ? "header__menu-line_rotate"
                    : "header__menu-line"
                }`}
              ></span>
            </button>
            <div
              className={`header__menu ${
                burgerMenuIsOpened 
                  ? "header__menu_opened" 
                  : "header__menu"
              }`}
            >
              <p className="header__menu-text">{email}</p>
              <Link
                onClick={onSignOut}
                className="header__menu-item"
                to="/signin"
              >
                Выйти
              </Link>
            </div>
          </>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
