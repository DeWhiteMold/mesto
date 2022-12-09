import PopUp from "./popUp.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._popUpImage = this._popUp.querySelector('.photo-pop-up__image');
    this._popUpDescription = this._popUp.querySelector('.photo-pop-up__description');
  }

  open(evt) {
    super.open();

    this._popUpImage.src = evt.target.src;
    this._popUpImage.alt = `${evt.target.closest('.place').textContent} фото`;
    this._popUpDescription.textContent = evt.target.closest('.place').textContent;
  }
}