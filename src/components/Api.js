export default class Api {
  constructor ({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // От сервера всегда проверяется на корректность
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    }).then(this._getResponse);
  }

  // Получение данных карточек
  getCardsInfo() {
    return fetch(`${this._baseUrl}cards`, { 
      headers: this._headers
    }).then(this._getResponse);
  }

  // Добавление карточек
  postNewCard(newCard) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.title,
        link: newCard.link
      }),
      
    })
    .then(this._getResponse);
  }

  // Редактирование профиля
  patchUserProfil(userInfo) {
    return fetch(`${this._baseUrl}users/me`, { 
      method: 'PATCH',
      body: JSON.stringify({
        name: userInfo.userName,
        about: userInfo.userJob
      }),
      headers: this._headers
    })
    .then(this._getResponse);
  }

  // Смена аватара
  patchAvatarUser( avatar_link ) {
    return fetch(`${this._baseUrl}users/me/avatar`, { 
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar_link.avatar
      }),
      headers: this._headers,
      
    }).then(this._getResponse);
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse);
  }

  // Поставить лайк
  putCardLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponse);
  }

  // Удалить лайк:
  deleteCardLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse);
  }
}