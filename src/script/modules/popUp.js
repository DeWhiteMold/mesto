export default class PopUp {
  constructor( popUpSelector ) {
    this._popUp = document.querySelector(popUpSelector);
    this._closeIcon = this._popUp.querySelector('.pop-up__close-button');
    this._overlay = this._popUp.querySelector('.pop-up__overlay');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popUp.classList.add('pop-up_opend');
    this._popUp.classList.remove('pop-up_visability');
    document.addEventListener('keydown', this._handleEscClose);
    console.log(this._closeIcon)
    console.log(this._popUp)
  }

  close() {
    this._popUp.classList.remove('pop-up_opend');
    this._popUp.classList.add('pop-up_visability');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
      if(evt.key === 'Escape') {
        this.close();
      }
  }

  setEventListeners() {
    this._closeIcon.addEventListener('click', () => {this.close()});
    this._overlay.addEventListener('click', () => {this.close()});
  }
}