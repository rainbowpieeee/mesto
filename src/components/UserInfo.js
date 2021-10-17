//Класс редактирование профиля собирает данные и добавляет на страницу
export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
    
  }

  // возвращает объект с данными пользователя.
  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    };
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    
  }

  //Меняем аватар
  setUserAvatar(data) {
    this._avatar.setAttribute("src", data.avatar);
    
  }
 
}

