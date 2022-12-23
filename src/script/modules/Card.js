export default class Card {
  constructor(data, tamplate, handleCardClick, handleRemoveClick) {
    this._tamplate = tamplate;
    this._name = data.name;
    this._imgLink = data.link;
    this._card = this._getTemplate();
    this._photo = this._card.querySelector('.place__photo');
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._likeBtn = this._card.querySelector('.place__like');
    this._likeCounter = this._card.querySelector('.place__like-counter');
    this._likeCounter.textContent = data.likes.length;
    this.ownerId = data.owner._id;
    this.cardId = data._id;
    this._removeBtn = this._card.querySelector('.place__remove');
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
    const newCard = this._card

    return newCard;
  }

  _addEventListeners() {
    this._card.querySelector('.place__photo').addEventListener('click', (evt) => {
      this._handleImageClick(evt);
    })

    this._likeBtn.addEventListener('click', () => {
      this._toggleLike();
    });

    this._removeBtn.addEventListener('click', () => {
      this._handleRemoveClick(this);
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
    console.log(this._card)
    this._card.remove()
  }

  showRemoveBtn() {
    this._removeBtn.removeAttribute('hidden');
  }
}
