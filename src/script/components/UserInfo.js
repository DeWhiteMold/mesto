export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelecctor) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector('.profile__photo');
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }

    return userData;
  }

  setUserInfo(newName, newDescription) {
    this._userName.textContent = newName;
    this._userDescription.textContent = newDescription;
  }

  setUserAvatar(newAvatarLink) {
    this._userAvatar.src = newAvatarLink;
  }
}