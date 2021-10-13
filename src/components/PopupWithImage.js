import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
	constructor(popup){
		super(popup)
		this._name = this._popup.querySelector('.popup__item-caption')
		this._link = this._popup.querySelector('.popup__item-pic')
	}
	open(name, link){
		super.open()
		this._link.src = link
		this._link.alt = name
		this._name.textContent = name
	}
}