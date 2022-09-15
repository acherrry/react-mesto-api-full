export const BASE_URL = 'http://localhost:3001';

export const checkResponse = (res) =>
  res.ok ?
    res.json()
    : Promise.reject(`Ошибка: ${res.status}`);

export const register = ({email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(checkResponse);
};

export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(checkResponse);
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(checkResponse);
}

export const loginOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(checkResponse);
};