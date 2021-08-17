const popupEdit = document.querySelector('.profile__edit-button');
const closingButtons = document.querySelectorAll('.popup__close');
const popupPicClose = document.querySelector('.popup__close_pic');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_text-name');
const statusInput = formElement.querySelector('.popup__input_text-status');
const profileName = document.querySelector('.profile__title');
const statusChange = document.querySelector('.profile__subtitle');


const popupAddPic = document.querySelector('.profile__add-button');
const popupPictures = document.querySelector('.popup_cards');
const popupBigPic = document.querySelector('.popup-big');
const picturesFormTemplate = document.querySelector('.template-cards');
const templateId = document.getElementById('template');
const container = document.querySelector('.elements');
const pictureForm = document.querySelector('.popup__form-pic');
const pictureNameInput = document.querySelector('.popup__input_picture-name');
const newPictureUrlInput = popupPictures.querySelector('[name="input-picture-link"]');
const newPictureNameInput = popupPictures.querySelector('[name="input-picture-name"]');


const bigImg = document.querySelector('.popup__img');
const figcaption = document.querySelector('.popup__figcaption');
const closeBig = document.querySelector('.popup__close-big')


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

function createCard(i) {
  const clonePicture = templateId.content.firstElementChild.cloneNode(true);
  clonePicture.querySelector('.elements__cell-title').textContent = i.name;
  clonePicture.querySelector('.elements__cell-like').addEventListener('click', (e) => {
    e.target.classList.toggle('elements__cell-like_active');
  })

  const newPicture = clonePicture.querySelector('.elements__image');

  newPicture.src = i.link;
  newPicture.alt = i.name;

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function onClickClosePopup(evt) {
  closePopup(evt.target.closest('.popup'));
}
function onClickEdit() {
  nameInput.value = profileName.textContent;
  statusInput.value = statusChange.textContent;
  openPopup(popup);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  statusChange.textContent = statusInput.value;
  closePopup(popup);
}

function onClickImg(e) {
  const bigLink = e.target.getAttribute('src');
  const bigTxt = e.target.getAttribute('alt');
  bigImg.setAttribute('src', bigLink);
  bigImg.setAttribute('alt', bigTxt);
  figcaption.textContent = bigTxt;
  openPopup(popupBigPic);
}

popupEdit.addEventListener('click', onClickEdit);

popupAddPic.addEventListener('click', () => openPopup(popupPictures));
formElement.addEventListener('submit', formSubmitHandler);
pictureForm.addEventListener('submit', formSubmitPictureFormHandler);
closingButtons.forEach(button => button.addEventListener('click', onClickClosePopup));











// более не нужно т.к выполняется этим function formSubmitPictureFormHandler(evt) {
// функция добавления карточки
// pictureForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const newImage = templateId.content.firstElementChild.cloneNode(true);
//   newImage.querySelector('.elements__image').textContent = pictureNameInput.value;
//   newImage.querySelector('.elements__delete-button').addEventListener('click', deletePic);
//   /* это тут более не нужно, вызываем в следующей функции
//   container.prepend(newImage);   <---- возникало дублирование тут т.к. создаёт ещё одну пустую карту!!!! */
// })
