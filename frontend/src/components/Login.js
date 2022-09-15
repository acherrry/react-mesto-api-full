import React from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(loginData);
  }

  return (
    <div className="sign-container">
      <h2 className="sign-container__title">Вход</h2>
      <form className="sign-container__form" onSubmit={handleSubmit}>
        <input
          className="sign-container__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
        />

        <input
          className="sign-container__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={loginData.password}
          onChange={handleChange}
        />

        <button
          className="sign-container__button-save"
          type="submit"
          onSubmit={handleSubmit}
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
