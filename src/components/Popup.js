export class Popup{
	constructor(popup){
		this._popup = popup;
		this._handleEscClose = this._handleEscClose.bind(this);
	};

	_handleEscClose(evt){
		if (evt.key === 'Escape'){
			this.close();
		}
	};

	_handleOverlayClose(evt){
		if (evt.target.classList.contains('popup_opened')){
			this.close();
		}
	};

	open(){
		this._popup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	};

	close(){
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	};

	setEventListeners(){
		this._popup.querySelector('.popup__button-close')
		.addEventListener('click', () => this.close());
		this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
	};
};