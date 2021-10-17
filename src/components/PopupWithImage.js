// Попап просмотра картинок
import Popup from './Popup.js';
// создаем новый класс наследуя от клсса Попапа
export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupTitle) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupTitle = popupTitle;
  }
  // наследуем от радительского попапа открытие и изменяем 
  openPopup({ linkElement, titleElement }) {
    this._popupImage.src = linkElement;
    this._popupImage.alt = titleElement;
    this._popupTitle.textContent = titleElement;

    super.openPopup();
}

}