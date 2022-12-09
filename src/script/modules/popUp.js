export default class PopUp {
  constructor( popUpSelector ) {
    this._popUp = document.querySelector(popUpSelector);
    this._closeIcon = this._popUp.querySelector('.pop-up__close-button');
    this._overlay = this._popUp.querySelector('.pop-up__overlay');
  }

  open() {
    this._popUp.classList.add('pop-up_opend');
    this._popUp.classList.remove('pop-up_visability');
  }

  close() {
    this._popUp.classList.remove('pop-up_opend');
    this._popUp.classList.add('pop-up_visability');
  }

  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape') {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._closeIcon.addEventListener('click', () => {this.close()});
    this._overlay.addEventListener('click', () => {this.close()});
    this._handleEscClose();
  }
}