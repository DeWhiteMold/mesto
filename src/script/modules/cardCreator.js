export default class Card {
  constructor(name, link, tamplate, handleCardClick) {
    this._tamplate = tamplate;
    this._name = name;
    this._imgLink = link;
    this._card = this._getTemplate();
    this._photo = this._card.querySelector('.place__photo');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = this._tamplate.querySelector('.place').cloneNode(true);

    return card;
  }

  createCard() {
    this._card.querySelector('.place__name').textContent = this._name;
    this._photo.src = this._imgLink;
    this._photo.alt = `${this._name} фото`;

    this._addEventListeners();

    return this._card;
  }

  _addEventListeners() {
    this._card.querySelector('.place__photo').addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    })

    this._card.querySelector('.place__like').addEventListener('click', () => {
      this._card.remove();
      this._card = null;
    });

    this._card.querySelector('.place__remove').addEventListener('click', (evt) => {
      evt.target.closest('.place').remove();
    });

    return this._card;
  }
}
