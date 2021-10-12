// Класс попапа 
export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseEsc = this._handleCloseEsc.bind(this); 
  };
  // открытие попапа
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseEsc);
  }

  // закрытие попапа
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseEsc);
  }

  // закрытие попапа по кнопке ESC
  _handleCloseEsc(event) {
    if(event.key === 'Escape') {
      this.closePopup();
    }
  }

  // добавляет слушатель клика по крестику закрытия
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')
  ) {
    this.closePopup();
  }
    });
  }


}