const formElement = document.querySelector('.popup__form');

const openEditProfilePopupBtn = document.querySelector('.profile__edit-button'); 
const closingButtons = document.querySelectorAll('.popup__close'); 
const popupPicClose = document.querySelector('.popup__close_pic'); 
const popup = document.querySelector('.popup'); 
const nameInput = formElement.querySelector('.popup__input_text-name'); 
const statusInput = formElement.querySelector('.popup__input_text-status'); 
const profileName = document.querySelector('.profile__title'); 
const statusChange = document.querySelector('.profile__subtitle'); 
 
const openAddCardPopupBtn = document.querySelector('.profile__add-button'); 
const popupPictures = document.querySelector('.popup_cards'); 
const popupBigPic = document.querySelector('.popup-big'); 
const picturesFormTemplate = document.querySelector('.template-cards'); 
const templateId = document.getElementById('template'); 
const container = document.querySelector('.elements'); 
const pictureForm = document.querySelector('.popup__form-pic'); 
const pictureNameInput = document.querySelector('.popup__input_picture-name'); 
const newPictureUrlInput = popupPictures.querySelector('[name="input-picture-link"]'); 
const newPictureNameInput = popupPictures.querySelector('[name="input-picture-name"]'); 
const buttonCard = document.querySelector('.popup__submit-pic');

const bigImg = document.querySelector('.popup__img'); 
const figcaption = document.querySelector('.popup__figcaption'); 
const closeBig = document.querySelector('.popup__close-big') 

const allPopups = document.querySelectorAll('.popup');
const AllPopupContainers = document.querySelectorAll('.popup__container');

const disabledButton = popupPictures.querySelector('.popup__submit');

const initialCards = [ 
  { 
    name: 'Архыз', 
    link: 
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' 
  }, 
  { 
    name: 'Челябинская область', 
    link: 
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' 
  }, 
  { 
    name: 'Иваново', 
    link: 
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' 
  }, 
  { 
    name: 'Камчатка', 
    link: 
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' 
  }, 
  { 
    name: 'Холмогорский район', 
    link: 
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' 
  }, 
  { 
    name: 'Байкал', 
    link: 
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' 
  } 
]; 
 
 
function deletePic(e) { 
  e.target.closest('.elements__cell').remove(); 
} 
 
function createCard(cardData) { 
  const clonePicture = templateId.content.firstElementChild.cloneNode(true); 
  clonePicture.querySelector('.elements__cell-title').textContent = cardData.name; 
  clonePicture.querySelector('.elements__cell-like').addEventListener('click', (e) => { 
    e.target.classList.toggle('elements__cell-like_active'); 
  }) 
 
  const newPicture = clonePicture.querySelector('.elements__image'); 
 
  newPicture.src = cardData.link; 
  newPicture.alt = cardData.name; 
 
  newPicture.addEventListener('click', onClickImg); 
 
  clonePicture.querySelector('.elements__delete-button').addEventListener('click', deletePic); 
  return clonePicture; 
}; 
 
 
for (const i of initialCards) { 
  container.appendChild(createCard(i)); 
} 
 
function formSubmitPictureFormHandler(evt) { 
  evt.preventDefault(); 
  const cardName = newPictureNameInput.value; 
  const cardUrl = newPictureUrlInput.value; 
  const data = { 
    name: cardName, 
    link: cardUrl, 
    alt: cardName 
  }; 
 
  pictureForm.reset(); 
  closePopup(popupPictures) 
  container.prepend(createCard(data)); 
} 

function buttonDisableWhenOpened(popupAddPic) {
  disabledButton.classList.add('popup__submit_disabled');
  disabledButton.setAttribute('disabled', true);
}
 
function openPopup(popup) { 
  popup.classList.add('popup_opened'); 
  document.addEventListener("keydown", onEscapeKey);
} 
 
function closePopup(popup) { 
  popup.classList.remove('popup_opened'); 
  document.removeEventListener("keydown", onEscapeKey);
} 
 
function onClickClosePopup(evt) { 
  newPictureUrlInput.value = '';
  newPictureNameInput.value = '';
  closePopup(evt.target.closest('.popup')); 
} 

function opentEditProfileForm() { 
  nameInput.value = profileName.textContent; 
  statusInput.value = statusChange.textContent; 
  openPopup(popup); 
} 
 
function submitEditProfileForm(evt) { 
  evt.preventDefault(); 
  profileName.textContent = nameInput.value; 
  statusChange.textContent = statusInput.value; 
  closePopup(popup); 
} 

function onEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

AllPopupContainers.forEach((doNotClose) => {
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
 
openEditProfilePopupBtn.addEventListener('click', opentEditProfileForm); 
openAddCardPopupBtn.addEventListener('click', () => openPopup(popupPictures)); 
formElement.addEventListener('submit', submitEditProfileForm); 
pictureForm.addEventListener('submit', formSubmitPictureFormHandler); 
closingButtons.forEach(button => button.addEventListener('click', onClickClosePopup)); 
openAddCardPopupBtn.addEventListener('click', () => buttonDisableWhenOpened(popupPictures));