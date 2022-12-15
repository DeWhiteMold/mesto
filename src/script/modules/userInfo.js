export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userPhotoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userPhoto = document.querySelector(userPhotoSelector);
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

  getUserPhoto() {
    const userPhotoLink = this._userPhoto.src.replace(`<%=require('` && `')%>`, '')
    return userPhotoLink;
  }

  setUserPhoto(newPhoto) {
    this._userPhoto.src = newPhoto;
  }
}