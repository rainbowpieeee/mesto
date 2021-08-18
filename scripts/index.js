const popupEdit = document.querySelector('.profile__edit-button');
const closingButtons = document.querySelectorAll('.popup__close');
const popupPicClose = document.querySelector('.popup__close_pic');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_text-name');
const statusInput = formElement.querySelector('.popup__input_text-status');
const profileName = document.querySelector('.profile__title');
const statusChange = document.querySelector('.profile__subtitle');

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

popupEdit.addEventListener('click', onClickEdit);

formElement.addEventListener('submit', formSubmitHandler);
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
