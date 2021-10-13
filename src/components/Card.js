export class Card {

	constructor(name, link, cardSelector, handleCardClick){
		this._name = name
		this._link = link
		this._cardSelector = cardSelector
		this._handleCardClick = handleCardClick
	}

	getCard(){
		this._cardTemplate = document.querySelector(this._cardSelector).content;
		this._newCard = this._cardTemplate.querySelector('.element').cloneNode(true);
		return this._newCard
	}

	_setEventListeners() {
		this._cardText = this._newCard.querySelector('.element__title');
		this._cardImage = this._newCard.querySelector('.element__pic');
		this._cardDeleteButton = this._newCard.querySelector('.element__remove');
		this._likeButton = this._newCard.querySelector('.element__like');

		this._likeButton.addEventListener('click', () =>{
			this._likeButton.classList.toggle('element__like_active');
		})
		this._cardDeleteButton.addEventListener('click', function (evt){
			const evtTarget = evt.target
			evtTarget.closest('.element').remove();
		})
		this._cardImage.addEventListener("click", () =>{
			this._handleCardClick(this._name, this._link);
		})
	}
	
	generateCard() {
		this._element = this.getCard()

		this._setEventListeners()

		this._cardText.textContent = this._name
		this._cardImage.src = this._link
		this._cardImage.alt = this._name

		return this._element
	}
}