# Проект: mesto-react

### Обзор применяемых в работе технологий
* _Вёрстка выполнена семантическими тегами_
* _Файловая структура организована по БЭМу_
* _Адаптивная вёрстка с использованием медиазапросов_
* _Способы построения сетки - Flexbox, Grid Layout_
* _Использование React_
* _Использование JavaScript_

**Описание**

Проект mesto-react выполнен с использованием React - JavaScript-библиотеки для создания пользовательских интерфейсов 
Вёрстка адаптивная: ширина контейнера с содержимым меняется вместе с шириной окна браузера.

Проект Место подключен к серверу. Адрес сервера проекта Mesto: https://mesto.nomoreparties.co. Для работы с API создан класс api.
Регистрация и авторизация в проекте подключена к серверу https://auth.nomoreparties.co. В файле Auth.js созданы три запроса к серверу:
для регистрации, для авторизации, для проверки валидности токена и получения email для вставки в шапку сайта.

Вся функциональность приложения доступна только авторизованным пользователям по роуту /, поэтому дополнительно реализовано два роута для неавторизованных пользователей:
/sign-up — для регистрации пользователя;
/sign-in — для авторизации пользователя.
Если неавторизованный пользователь приходит на сайт, он попадает на страницу входа, на какой бы роут он ни пришёл.

Для того, чтобы пользовател могли зарегистироваться и авторизоваться, добавлены формы.

Работу с localStorage настроена так - токен сохраняется в нём и используется при работе с сайтом, при повторном визите пользователи не должны вновь авторизовываться.

Информация о пользователе загружается с сервера. Создан контекст текущего пользователя, так как данные пользователя нужны в разных компонентах приложения.

Карточки с фото и текстом также загружаются с сервера. В ответ от сервера приходит JSON с массивом карточек, которые загрузили студенты моей группы. На карточке есть кнопки - «Удалить», «Лайк», отображено количество поставленных лайков. Реализован функционал по добавлению карточкам лайков и удалению своих карточек.

Popupы открываются по нажатию на кнопоки «Редактировать профиль», «Добавить», «Редактировать фото пользователя», "Удалить фото", а также при нажатии на изображение. Об успешной (или неуспешной регистрации) пользователя также информирует popup-всплывающее уведомление. Закрываются popupы при клике по крестику в правом верхнем углу. Плавность открытия и закрытия модальных окон реализована CSS-стилями.

Пользователь может редактировать свой аватар, имя и информацию о себе, добавлять новые карточки - направляются запросы на сервер для обновления информации на странице. При отправке запроса на сервер пользователю на кнопке выводится сообщение "Сохранение...", тем самым мы информирмируем пользователя о том, что данные загружаются.

В формах добавления карточки, редактирования аватара и информиции о пользователе реализована валидация.


[![Tests for sprint 13](https://github.com/acherrry/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/acherrry/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests for sprint 14](https://github.com/acherrry/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/acherrry/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## О проекте
В текущей проектной работе я продолжаю разрабатывать бэкенд (сервер) проекта Mesto.
В app.js выполнено подключение к серверу MongoDB. Имя созданной базы данные - mestodb.
В проекте две сущности: пользователь и карточки. Созданы схемы и модели для каждой сущности.
Созданы контроллеры и роуты для пользователей и карточек. 
Также я позаботилась о безопасности, пароль хранится в базе в захешированном виде.
Реализована централизованная обработка ошибок, приходящие на сервер запросы валидируются, также валидируются данные на уровне схемы.

Приложение корректно обрабатывает запросы по следующим роутам:
`POST /signup` — регистрирует пользователя,
`POST /signin` — авторизует пользователя.

Все маршруты защищены авторизацией, кроме страницы регистрации и входа. При попытке неавторизованного пользователя обратиться к защищённому маршруту возвращается 401 ошибка.

`GET /users` — возвращает всех пользователей из базы,
`GET /users/:userId` — возвращает пользователя по _id,
`PATCH /users/me` — обновляет профиль пользователя,
`PATCH /users/me/avatar` — обновляет аватар пользователя,
`GET /cards` — возвращает все карточки из базы,
`POST /cards` — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для карточки,
`DELETE /cards/:cardId` — удаляет карточку по _id,
`PUT /cards/:cardId/likes` — ставит лайк карточке,
`DELETE /cards/:cardId/likes` — убирает лайк с карточки.

У пользователя есть права удалять только свои карточки, редактировать свой профиль.

В случаях, если при запросе что-то идет не так — возвращается соответствующий код ошибки:
400 — переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
401 — передан неверный логин или пароль. Также эту ошибку возвращает авторизационный middleware, если передан неверный JWT;
403 — попытка удалить чужую карточку;
404 — карточка или пользователь не найден;
409 — при регистрации указан email, который уже существует на сервере;
500 — ошибка по-умолчанию.

Ссылка на репозиторий: https://github.com/acherrry/express-mesto-gha.git

## Директории проекта

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки
`/middlewares` — папка с мидлвэром для авторизации, который верифицируеи токен
`/errors` — папка с классами ошибок, возникающих на сервере
`/utils` — папка со статусами ответа сервера и регулярным выражением для валидации URL

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
`npm run lint` — запускает сервер линтер (линтер отлавливает ошибки и следит за единообразием кода)

# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`. 
  
Пожалуйста, прикрепите в это описание ссылку на сайт, размещенный на Яндекс.Облаке.

