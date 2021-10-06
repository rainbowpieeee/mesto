import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
};

const formElement = document.querySelector('.popup__form');
const editFormModalWindow = document.getElementById('popup');
const cardFormModalWindow = document.getElementById('popup_cards');

const popupEdit = document.querySelector('.profile__edit-button');
const closingButtons = document.querySelectorAll('.popup__close');
const popupProfile = document.querySelector('.popup');
const nameInput = formElement.querySelector('.popup__input_text-name');
const statusInput = formElement.querySelector('.popup__input_text-status');
const profileName = document.querySelector('.profile__title');
const statusChange = document.querySelector('.profile__subtitle');

const openCardFormButton = document.querySelector('.profile__add-button');
const popupPictures = document.querySelector('.popup_cards');
const popupBigPic = document.querySelector('.popup-big');
const container = document.querySelector('.elements');
const pictureForm = document.querySelector('.popup__form-pic');
const newPictureUrlInput = popupPictures.querySelector('[name="input-picture-link"]');
const newPictureNameInput = popupPictures.querySelector('[name="input-picture-name"]');

const bigImg = document.querySelector('.popup__img');
const figcaption = document.querySelector('.popup__figcaption');

const allPopups = document.querySelectorAll('.popup');
const allPopupContainers = document.querySelectorAll('.popup__container');

const disabledButton = popupPictures.querySelector('.popup__submit');

initialCards.forEach((item) => {
  const card = new Card(item, '.template-cards');
  const cardElement = card.generateCard();
  container.append(cardElement);
});

function handleSubmitPictureFormHandler(evt) {
  evt.preventDefault();
  const cardName = newPictureNameInput.value;
  const cardUrl = newPictureUrlInput.value;
  const item = {
    title: cardName,
    link: cardUrl,
    alt: cardName
  };
  pictureForm.reset();
  closePopup(popupPictures);
  container.prepend(createCard(item));
}

function createCard(item) {
  return (new Card(item, '#template')).generateCard();
}

const editFormValidator = new FormValidator(selectors, editFormModalWindow);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(selectors, cardFormModalWindow);
cardFormValidator.enableValidation();

openCardFormButton.addEventListener('click', () => {
  cardFormValidator.disableSubmitButton();
});

function openPopup(popupProfile) {
  popupProfile.classList.add('popup_opened');
  document.addEventListener("keydown", onEscapeKey);
}

function closePopup(popupProfile) {
  popupProfile.classList.remove('popup_opened');
  document.removeEventListener('keydown', onEscapeKey);
}

function onClickClosePopup(evt) {
  closePopup(evt.target.closest('.popup'));
}

function onClickEdit() {
  nameInput.value = profileName.textContent;
  statusInput.value = statusChange.textContent;
  openPopup(popupProfile);
}

function handleFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  statusChange.textContent = statusInput.value;
  closePopup(popupProfile);
}

function onEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

allPopupContainers.forEach((doNotClose) => {
  doNotClose.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
})

bigImg.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

allPopups.forEach((popup) => {
  popup.addEventListener('click', onClickClosePopup);
});

function onClickImg(e) {
  const bigLink = e.target.getAttribute('src');
  const bigTxt = e.target.getAttribute('alt');
  bigImg.setAttribute('src', bigLink);
  bigImg.setAttribute('alt', bigTxt);
  figcaption.textContent = bigTxt;
  openPopup(popupBigPic);
}
export { onClickImg };

popupEdit.addEventListener('click', onClickEdit);
openCardFormButton.addEventListener('click', () => openPopup(popupPictures));

formElement.addEventListener('submit', handleFormSubmitHandler);
pictureForm.addEventListener('submit', handleSubmitPictureFormHandler);
closingButtons.forEach(button => button.addEventListener('click', onClickClosePopup));
