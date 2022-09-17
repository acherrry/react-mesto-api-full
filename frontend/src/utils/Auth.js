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

export const loginOut = (res) => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(res)
  .catch(err => console.log(err))
};