export class FormValidator {
  constructor(obj, formElement) {
    this._inputElement = obj.inputElement;
    this._submitButtons = obj.submitButtons;
    this._submitButtonDisabled = obj.submitButtonDisabled;
    this._inputErrors = obj.inputErrors;
    this._spanErrorsActive = obj.spanErrorsActive;
    this._spanErrors = obj.spanErrors;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    this._submitButtonElement = this._formElement.querySelector(this._submitButtons);
    this._spanErrorsList = Array.from(this._formElement.querySelectorAll(this._spanErrors));
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrors);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._spanErrorsActive);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrors);
    errorElement.classList.remove(this._spanErrorsActive);
    errorElement.textContent= '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._submitButtonDisabled);
      this._submitButtonElement.setAttribute('disabled', true);
    } else {
      this._submitButtonElement.classList.remove(this._submitButtonDisabled);
      this._submitButtonElement.removeAttribute('disabled');
    };
  };
  
	resetValidation() {
		this._toggleButtonState();// <== управляем кнопкой ==
	
		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement)// <==очищаем ошибки ==
		});
	}
};