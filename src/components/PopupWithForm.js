// Попап формы
import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = this._popupForm.querySelectorAll('.form__field');
    this._submitForm = submitForm;
    this._btnSubmit =  this._popupForm.querySelector('.form__button');
  };

  // собираем данные полей  ввода
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
    super.setEventListeners();
  }
  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
//Меняем текст при загрузке 
  loadingBtn(isLoading) {
    if (isLoading) {
      this._btnSubmit.textContent = "Сохранение...";
    } else {
      this._btnSubmit.textContent = "Сохранить";
    }
  }

}