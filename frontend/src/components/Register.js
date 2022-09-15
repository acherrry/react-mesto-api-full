import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(registerData);
  }

  return (
    <div className="sign-container">
      <h2 className="sign-container__title">Регистрация</h2>
      <form className="sign-container__form" onSubmit={handleSubmit}>
        <input
          className="sign-container__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleChange}
        />

        <input
          className="sign-container__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={registerData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          onSubmit={handleSubmit}
          className="sign-container__button-save"
        >
          Зарегистрироваться
        </button>
      </form>

      <div className="sign-container__signin">
        <p className="sign-container__specify-text">Уже зарегистрированы?</p>
        <Link to="/login" className="sign-container__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
