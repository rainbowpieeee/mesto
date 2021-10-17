 // Класс валидации форм
export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = formElement.querySelectorAll(this._inputSelector);
    this._submitButton = formElement.querySelector(this._submitButtonSelector);

    this._formElement = formElement;
  };
   // функция добавления ошибки
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

// функция удаления ошибки
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

   // Проверка на валидность
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; 

  // Функция убираем ошибки при открытии попапов
  hideInputSelectorError() {
      this._inputList.forEach((inputElement) => {
      this._hideInputError (inputElement);
    });
  };

  // Функция делаем  кнопку не активной или активной 
  toggleButtonState() {
    const formValid = this._formElement.checkValidity(); 

    if (!formValid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  };

  
    // Находим поля ввода вешаем обработчики
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
         this.toggleButtonState();
      });
        
    });
      
  };

  //запускаем валидацию 
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
      this._setEventListeners();
  };
};