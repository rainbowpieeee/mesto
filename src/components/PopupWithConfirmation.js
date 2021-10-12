import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
  // Метод, который динамически позволяет менять колбэк
  setSubmitForm(handler) {
    this._handleSubmit = handler;
  }

  // Вешаем на форму обработчик
  setEventListeners() {
    super.setEventListeners(); // добавляем слушателя прямо на попап
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      
    })
  }
}