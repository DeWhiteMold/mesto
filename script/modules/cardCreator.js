import {photoPopUp, photoPopUpImage, openPopUp} from '../script.js';

export default class Card {
  constructor(name, link, tamplate) {
    this._tamplate = tamplate;
    this._name = name;
    this._imgLink = link;
  }

  _getTemplate() {
    const card = this._tamplate.querySelector('.place').cloneNode(true);

    return card;
  }

  createCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.place__name').textContent = this._name;
    this._card.querySelector('.place__photo').src = this._imgLink;
    this._card.querySelector('.place__photo').alt = `${this._name} фото`;

    this._addEventListeners();

    return this._card;
  }

  _addEventListeners() {
    this._card.querySelector('.place__photo').addEventListener('click', (evt) => {
      openPopUp(photoPopUp);
      photoPopUpImage.src = evt.target.src;
      photoPopUp.querySelector('.photo-pop-up__description').textContent = evt.target.closest('.place').textContent;
      photoPopUpImage.alt = `${evt.target.closest('.place').textContent} фото`;
    })

    this._card.querySelector('.place__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('place__like_active');
    });

    this._card.querySelector('.place__remove').addEventListener('click', (evt) => {
      evt.target.closest('.place').remove();
    });

    return this._card;
  }
}
