const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const { NODE_ENV, JWT_SECRET } = process.env;
const { OK, CREATED } = require('../utils/constants');

const getUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(OK).send(users);
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному ID не найден');
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Невалидные переданные данные'));
    }
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new ConflictError('При регистрации указан email, который занял другой пользователь');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    return res.status(CREATED).send({
      _id: createdUser._id,
      name: createdUser.name,
      about: createdUser.about,
      avatar: createdUser.avatar,
      email: createdUser.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Передан неверный email или пароль');
    }
    const comparablePassword = await bcrypt.compare(password, user.password);
    if (!comparablePassword) {
      throw new UnauthorizedError('Передан неверный email или пароль');
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret');

    res.cookie('jwt', token, {
      expiresIn: 604800,
      httpOnly: true,
    });
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные для авторизации'));
    }
    return next(err);
  }
};

const loginOut = async (req, res) => res.status(200).clearCookie('jwt').send();

const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному ID не найден');
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Невалидные переданные данные'));
    }
    return next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User
      .findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('Пользователь с указанным ID не найден');
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
    }
    if (err.name === 'CastError') {
      return next(new BadRequestError('Передан некорректный ID'));
    }
    return next(err);
  }
};

const editAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User
      .findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('Пользователь с указанным ID не найден');
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
    }
    if (err.name === 'CastError') {
      return next(new BadRequestError('Передан некорректный ID'));
    }
    return next(err);
  }
};

module.exports = {
  getUser,
  getCurrentUser,
  getUserById,
  createUser,
  login,
  loginOut,
  editProfile,
  editAvatar,
};
