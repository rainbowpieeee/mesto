export class UserInfo{ 
	constructor({name, role, avatar}){
		this._userNameElement = name
		this._userAboutElement = role
		this._userAvatarElement = avatar
	}

	getUserInfo(){
		this._userData = {}
		this._userData.name = this._userNameElement.textContent
		this._userData.role = this._userAboutElement.textContent
		this._userData.avatar = this._userAvatarElement.link
		return this._userData
	}

	setUserInfo(item){
		if (item.name){
			this._userNameElement.textContent = item.name
		}
		if (item.role){ 
			this._userAboutElement.textContent = item.role
		}
		if (item.avatar){
			this._userAvatarElement.link = item.avatar
		}
	}
}