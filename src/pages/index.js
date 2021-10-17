import '../pages/index.css';

import Api from "../components/Api.js"
import Card  from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from "../components/UserInfo.js";
import { 
  profilePopupOpenButton, nameInput, jobInput, avatarForm, profileFormPopup, buttonAddCards, formCardsPopup, 
  usersOnline, imageCardsmage, buttnClosePopupCards, 
  figcaption, config, avatarAdd } from '../utils/constants.js';
// Данные пользователя
let userData = null;

  
// Класс Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28/',
  headers: {
    authorization: 'fa9ce565-b3ee-4bba-a683-83a687542ac2',
    'Content-Type': 'application/json'
  }
});

//Данные профиля
const infoProfile = new UserInfo({ nameSelector: '.profile__title', infoSelector: '.profile__subtitle', avatarSelector: '.profile__avatar' });
  

// Получаем массив карточек и инфу профиля с сервера 
Promise.all([api.getCardsInfo(), api.getUserInfo()])
.then(([cardsArray, result]) => {   // приходящие данные тот же порядок
  userData = result; 
  defaultCardList.initialCards(cardsArray);
  infoProfile.setUserInfo(result);
  infoProfile.setUserAvatar(result);
})
.catch((err) => {
  console.log(`${err}`);
});

  
//Включаем валидацию форм
const formValidatorEdit = new FormValidator(config, profileFormPopup);
const formValidatorCard = new FormValidator(config, formCardsPopup);
const formVAlidationAvatar = new FormValidator(config, avatarForm);

formValidatorEdit.enableValidation();
formValidatorCard.enableValidation();
formVAlidationAvatar.enableValidation();

//--------------------------------------Создание карточек--------------------------------------

// Функция создания карточек
function createCards(item){
  const card = new Card('.elements', {
    data: item,
    ownerId: userData._id, 
    handleCardClick: handleCardClick, 
    handleLikeCard: () => handleLikeCard(card, item),
    handleDeliteCard: () => deliteCard(card)
  });
  return card.generateCard(item);
  
};

// Добавляем карточки по дефолту
const defaultCardList = new Section ({
  //функция отвечает за создание и отрисовку данных на странице.
  renderer: (item) => {
    const cards = createCards(item);
    defaultCardList.addItem(cards);
  }
},
usersOnline
);

//----------------------------Ставим лайк------------------------------------------------------

//Ставим лайк
function handleLikeCard(card, data) {
  const promise = card.isLiked() ? api.deleteCardLike(data._id) : api.putCardLike(data._id);
  promise
    .then((data) => {
      card.setLike(data);
      
    })
    .catch((err) => {
      console.log(err);
    });
}  

// ----------------------------------- Попап удаления карточки--------------------------------
 
// Попап подтверждения удаления карточек
const popupDeleteCards = new PopupWithConfirmation('.popup_container_delete-cards');
popupDeleteCards.setEventListeners();

//Функция удаления карточки.
function deliteCard(card) {
  popupDeleteCards.setSubmitForm(() => {
    api.deleteCard(card.cardId) // cardId - неприватное поле класса Card
      .then(() => {
        card.deleteCard();
        popupDeleteCards.closePopup();
      })
      .catch((err) => {
        console.log(err)
      });
  });
  popupDeleteCards.openPopup();
}

//--------------------------------- Попап просмотр карточек-----------------------------------------
 
// Попап  просмотр картинок
const popupShowImageCards = new PopupWithImage('.popup_content_image', imageCardsmage, figcaption);
popupShowImageCards.setEventListeners();

 //функция  открытие попапа просмотра карточек 
function handleCardClick (link, name) {
  popupShowImageCards.openPopup({ linkElement: link, titleElement: name});
};

// обработчик закрытия попапа просмотра картинок и добавление информации
buttnClosePopupCards.addEventListener('click', () => popupShowImageCards.closePopup());



//---------------------------------Попап редактирования профиля----------------------------------------

// Попап редактирование профиля
const popupWithProfile = new PopupWithForm('.popup_profile_editing',
  {
    submitForm: (userInfo) => {
      popupWithProfile.loadingBtn(true);
      api.patchUserProfil(userInfo)
      .then(dataProfile => {
        infoProfile.setUserInfo(dataProfile);
        popupWithProfile.closePopup();
      })
      .catch((err) => {
        console.log("Ошибка при редактировании профиля"); 
      })
      .finally(() => {
        popupWithProfile.loadingBtn(false);
      })
    }
  },
)
popupWithProfile.setEventListeners();
 

// Открываем попап редактирование профиля
profilePopupOpenButton.addEventListener('click', openedProfileInfo);

 //Функция открытия попапа редактирование профиля 
function openedProfileInfo () {
  const userProfile = infoProfile.getUserInfo();
  nameInput.value = userProfile.name;
  jobInput.value = userProfile.info;
  popupWithProfile.openPopup();
  formValidatorEdit.toggleButtonState();
  formValidatorEdit.hideInputSelectorError();
};

//--------------------------------------Попап смены аватара -----------------------------------------------

//Попап смены аватара
const popupAvatarForm = new PopupWithForm('.popup_container_avatar', 
{
  submitForm: (avatar_link) => {
      popupAvatarForm.loadingBtn(true);
      api.patchAvatarUser(avatar_link)
      .then(dataProfile => {
        infoProfile.setUserAvatar(dataProfile);
        popupAvatarForm.closePopup();       
        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatarForm.loadingBtn(false);
      })
  }
  },
);
popupAvatarForm.setEventListeners();

// слушатель смены аватара
avatarAdd.addEventListener('click', editAvatarProfile)  

 //Функция редактирования аватара
function editAvatarProfile() {
  popupAvatarForm.openPopup();
  formVAlidationAvatar.toggleButtonState();
  formVAlidationAvatar.hideInputSelectorError();
}
//-------------------------Попап добавлениие карточек--------------------------------------------------------------------------

 // Попап добавлениие карточек
const popupCardsAdd = new PopupWithForm('.popup_container_cards', 
  {
    submitForm: (newCard) => {
      popupCardsAdd.loadingBtn(true);
      api.postNewCard(newCard)
      .then(card => {
        const newCards = createCards(card);
        defaultCardList.addItem(newCards);
      })
      .then(() => {
        popupCardsAdd.closePopup();
      })
      .catch((err) => {
        console.log(err);"Ошибка при добавлении карточек на страницу"
      })
      .finally(() => {
        popupCardsAdd.loadingBtn(false);
      })
    }
  },
    
  );
popupCardsAdd.setEventListeners();

  // Слушатель открытие попапа добавление карточек
buttonAddCards.addEventListener('click', openPopupAddCards);

//Функция открытие попапа добавления карточек
function openPopupAddCards () {
  popupCardsAdd.openPopup();
  formValidatorCard.toggleButtonState();
  formValidatorCard.hideInputSelectorError();
};


