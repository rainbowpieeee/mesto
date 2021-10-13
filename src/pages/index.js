import './index.css';
import { 
	initialCards,
	popupEditProfile,
	popupAdditem,
  popupAvatar,
  popupDelete,
  popupPicture,
	nameInput,
	jobInput,
  avatarInput,
	profileEditButton,
	profileAddButton,
  ProfileAvatarButton,
  cardDeleteButton,
	profileName,
	profileRole,
	profileAvatar,
  editForm,
  addForm,
  avatarForm,
  element,
  elements,
	object,
} from '../utils/constants.js';
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithForm } from '../components/PopupWithForm.js'

const newCard = new PopupWithForm(popupAdditem, (item) =>{
	const newCards = createCard(item.nameItem, item.pic)
	cardsCatalogue.addItem(newCards);
	newCard.close();
})
newCard.setEventListeners();

const cardsCatalogue = new Section({
	items: initialCards,
	renderer:(item)=>{
		const cardElement = createCard(item.name, item.link)

		cardsCatalogue.addItem(cardElement);
	}},elements);

cardsCatalogue.renderItems();

function createCard(name,link) {
	const card = new Card(name, link, element, handleCardClick)
	return card.generateCard();
}

const popupCardView = new PopupWithImage(popupPicture)
popupCardView.setEventListeners();

function handleCardClick(name, link){
	popupCardView.open(name, link);
}

// Попап обновления информации о пользователе.
const profileInfo = new UserInfo({
	name: profileName,
	role: profileRole,
	avatar: profileAvatar,
});

const popupProfileEdit = new PopupWithForm(popupEditProfile, (item) => {
	profileInfo.setUserInfo(item);
	popupProfileEdit.close();
},editForm);
popupProfileEdit.setEventListeners();

profileEditButton.addEventListener('click', function(){
	popupProfileEdit.open();
	const origUserInfo = profileInfo.getUserInfo();
	nameInput.value = origUserInfo.name;
	jobInput.value = origUserInfo.role;
	formValidatorEditProfile.resetValidation();
})
// Попап добавления карточки
profileAddButton.addEventListener('click', function(){
	newCard.open();
	formValidatorAddPicture.resetValidation();
})

const formValidatorEditProfile = new FormValidator(object, editForm);
formValidatorEditProfile.enableValidation();

const formValidatorAddPicture = new FormValidator(object, addForm);
formValidatorAddPicture.enableValidation();