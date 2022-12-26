import PopUp from "./PopUp.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._popUpImage = this._popUp.querySelector('.photo-pop-up__image');
    this._popUpDescription = this._popUp.querySelector('.photo-pop-up__description');
  }

  open(card) {
    super.open();

    this._popUpImage.src = card.photo.src;
    this._popUpImage.alt = `${card.name} фото`;
    this._popUpDescription.textContent = card.name;
  }
}