export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector) {
    this._userName = document.querySelector(userNameSelector).textContent;
    this._userDescription = document.querySelector(userDescriptionSelector).textContent;
  }

  getUserInfo() {
    const userData = {
      name: this._userName,
      description: this._userDescription
    }

    return userData;
  }

  setUserInfo(newName, newDescription) {
    this._userName = newName;
    this._userDescription = newDescription;
  }
}