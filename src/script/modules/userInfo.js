export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
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
}