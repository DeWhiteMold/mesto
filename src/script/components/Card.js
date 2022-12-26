export default class Card {
  constructor(data, userId, tamplateSelector, handleCardClick, handleRemoveClick, handleLike, handleDeleteLike) {
    this._tamplate = document.querySelector(tamplateSelector).content;
    this._userId = userId;
    this.name = data.name;
    this._imgLink = data.link;
    this._card = this._getTemplate();
    this.photo = this._card.querySelector('.place__photo');
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._likeBtn = this._card.querySelector('.place__like');
    this._likes = data.likes
    this._activeLikeSelector = 'place__like_active';
    this._likeCounter = this._card.querySelector('.place__like-counter');
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
    this.ownerId = data.owner._id;
    this.cardId = data._id;
    this._removeBtn = this._card.querySelector('.place__remove');
  }

  _getTemplate() {
    const card = this._tamplate.querySelector('.place').cloneNode(true);

    return card;
  }

  createCard() {
    this._card.querySelector('.place__name').textContent = this.name;
    this.photo.src = this._imgLink;
    this.photo.alt = `${this.name} фото`;
    this._likeCounter.textContent = this._likes.length;

    if(this._userId === this.ownerId) {
      this._showRemoveBtn();
    }

    this._likes.forEach((like) => {
      if(like._id === this._userId) {
        this.addLike();
      }
    })

    this._addEventListeners();
    const newCard = this._card

    return newCard;
  }

  _addEventListeners() {
    this.photo.addEventListener('click', (evt) => {
      this._handleImageClick(evt);
    })

    this._likeBtn.addEventListener('click', () => {
      if(this._checkIfLiked()) {
        this._handleDeleteLike();
      }
      else {
        this._handleLike()
      }
    });

    this._removeBtn.addEventListener('click', () => {
      this._handleRemoveClick(this);
    });

    return this._card;
  }

  _handleImageClick(evt) {
    this._handleCardClick(evt);
  }

  setAmountOfLikes(newCard) {
    this._likeCounter.textContent = newCard.likes.length;
  }

  _checkIfLiked() {
    if(this._likeBtn.classList.contains(this._activeLikeSelector)) {
      return true;
    }

    return false;
  }

  addLike() {
    this._likeBtn.classList.add(this._activeLikeSelector);
  }

  deleteLike() {
    this._likeBtn.classList.remove(this._activeLikeSelector);
  }

  removeCard() {
    this._card.remove()
  }

  _showRemoveBtn() {
    this._removeBtn.classList.remove('place__remove_hidden');
  }
}
