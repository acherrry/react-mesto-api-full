const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const regExpUrl = require('./utils/validation');

const {
  createUser, login, loginOut,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-err');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3001 } = process.env;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExpUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.delete('/signout', loginOut);

app.use(auth);
app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode === undefined) {
    const { statusCode = 500, message } = err;
    return res.status(statusCode).send({
      message: statusCode === 500
        ? 'Внутренняя ошибка сервера'
        : message,
    });
  }
  next();
  return res.status(err.statusCode).send({ message: err.message });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
}

main();
