
// Класс для создания карточек
export default class Card {
  constructor(cardSelector, { data, ownerId, handleCardClick, handleLikeCard, handleDeliteCard, }) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._ArrayLikes = data.likes; // массив для проверки лайков
    this.cardId = data._id; // id карточки для удаления
    this._dataOwnerId = data.owner._id; //id с сервера
    this._ownerId = ownerId; 
    this._handleLikeCard = handleLikeCard;
    this._handleDeliteCard = handleDeliteCard;
    
  }
  // получаем карточку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
    return cardElement;
  }

// наполняем карточку данными, передаем этот метод для отрисовки карточки на странице
  generateCard() {
    this._element = this._getTemplate();
    
    this._newImageElement = this._element.querySelector('.elements__image');
    this._newTextElement = this._element.querySelector('.elements__text');
    this._newImageElement.src = this._link;
    this._newImageElement.alt = this._name;
    this._newTextElement.textContent = this._name;
    this._elementLike = this._element.querySelector('.elements__group');
    this._elementBtnDelete = this._element.querySelector('.elements__btn');
    
    //Сохраняем лайки после перезагрузки
    this.setLike({likes: this._ArrayLikes}); 
    this._showCardDelete();
    this._setEventListeners()
    
    return this._element;
    
  }

   //метод удаление карточки
  deleteCard() {
    this._element.remove();
  };

   // Добавляем обработчики  на лайк и удаление карточки
  _setEventListeners() {
    // лайк
    this._elementLike.addEventListener('click', () => this._handleLikeCard(this));
    // // Удаление карточки
    this._elementBtnDelete.addEventListener('click', () => this._handleDeliteCard(this));
    // Открытие попапа просмотра картинок 
    this._newImageElement.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  };

  isLiked() {
    return this._isLiked;
  }

  //Ставим лайк
  setLike(newItem) {
    this._isLiked = newItem.likes.filter((item) => {return item._id == this._ownerId;}).length > 0; //проверяем  по id  стоит ли мой лайк 
    this._element.querySelector('.elements__number-likes').textContent = newItem.likes.length;
    if (this._isLiked) {
      this._element.querySelector('.elements__group').classList.add('elements__group_like_active');
    } else {
      this._element.querySelector('.elements__group').classList.remove('elements__group_like_active');
    }
  }
  
  // Показываем кнопку удалить только на своих карточках
  _showCardDelete() {
    if (this._ownerId !== this._dataOwnerId) {
      this._element.querySelector('.elements__btn').classList.remove('elements__btn_active');
    }
  }
};

