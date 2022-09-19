const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret');
  } catch (err) {
    return next(new UnauthorizedError('Чтобы выполнить действия, пожалуйста, авторизуйтесь'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
