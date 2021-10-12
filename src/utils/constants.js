//импорт картинок для Webpack 
import carachaevo from '../images/kirill-pershin-1088404.jpg';
import elbrus from '../images/kirill-pershin-1404681-unsplash.png';
import dombiy from '../images/kirill-pershin-1556355-unsplash.jpg';
import bikal from '../images/photo-grid-baikal-2.jpg';
import sochi from '../images/photo-grid-sochi.jpg';
import karelia from '../images/place-karelia.jpg';

// Массив с данными карточек
const initialCards = [
  {
    link: carachaevo,
    name: 'Карачаево-Черкесия'
  },
  {
    link: elbrus,
    name: 'Гора Эльбрус'
  },
  {
    link: dombiy,
    name: 'Домбай'
  },
  {
    link: bikal,
    name: 'Байкал'
  },
  {
    link: sochi,
    name: 'Сочи'
  },
  {
    link: karelia,
    name: 'Карелия'
  },
];


const profilePopupOpenButton = document.querySelector('.profile__edit-button');
const profTitle = document.querySelector('.profile__title');
const profSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.popup_profile_editing');
const profileСlosePopup = document.querySelector('.popup__close-icon_profile_edit');
const nameInput = document.querySelector('.form__field_item_name');
const jobInput = document.querySelector('.form__field_item_job');
const profileFormPopup = document.querySelector('.form_profile_edit');
const avatarForm = document.querySelector('.popup__form_avatar');
// переменные для попапа добавление карточек
const popupAddCards = document.querySelector('.popup_container_cards');
const buttonAddCards = document.querySelector('.profile__add-button');
const cardsClosePopup = document.querySelector('.popup__close-icon_close_cards');
const formCardsPopup = document.querySelector('.popup__form_add_cards');
const imputTitleCards = document.querySelector('.form__field_item_title');
const inputLinkCards = document.querySelector('.form__field_item_link');
const usersOnline = document.querySelector('.template-container');
const popupClosCards = document.querySelector('.popup_content_image');
const imageCardsmage = document.querySelector('.popup__image');
const imagePopup = document.querySelector('.template-container');
const buttnClosePopupCards = document.querySelector('.popup__close-icon_close_image');
const figcaption = document.querySelector('.popup__image-caption');
const avatarAdd = document.querySelector('.profile__avatar');
const inputLinkAvatar = document.querySelector('.form__field_avatar');

// обект валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_btn_notactive',
  inputErrorClass: 'form__field_error_active',
  errorClass: 'form__field-error_status_error'
};



export { profilePopupOpenButton, profTitle, avatarForm, profSubtitle, profilePopup, profileСlosePopup, nameInput, jobInput, 
  profileFormPopup, popupAddCards, buttonAddCards, cardsClosePopup, formCardsPopup, imputTitleCards, inputLinkCards, 
  usersOnline, popupClosCards, imageCardsmage, imagePopup, inputLinkAvatar, buttnClosePopupCards, figcaption, config, initialCards, avatarAdd }