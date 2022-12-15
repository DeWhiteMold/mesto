export default class Card {
  constructor(name, link, tamplate, handleCardClick, handleRemoveClick) {
    this._tamplate = tamplate;
    this._name = name;
    this._imgLink = link;
    this._card = this._getTemplate();
    this._photo = this._card.querySelector('.place__photo');
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._likeBtn = this._card.querySelector('.place__like');
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
      this._handleImageClick(evt);
    })

    this._likeBtn.addEventListener('click', () => {
      this._toggleLike();
    });

    this._card.querySelector('.place__remove').addEventListener('click', () => {
      this._handleRemoveClick(this._card);
    });

    return this._card;
  }

  _handleImageClick(evt) {
    this._handleCardClick(evt);
  }

  _toggleLike() {
    this._likeBtn.classList.toggle('place__like_active');
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }
}
