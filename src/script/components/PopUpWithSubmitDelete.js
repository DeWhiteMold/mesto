import PopUp from "./PopUp.js";

export default class PopUpWithSubmitDelete extends PopUp {
  constructor(popUpSelector, deleteMethod) {
    super(popUpSelector);
    this._deleteMethod = deleteMethod;
    this._form = this._popUp.querySelector('.pop-up__form');
    this._saveBtn = this._form.querySelector('.pop-up__save-button');
  }

  open(item) {
    super.open();

    this._getItemToDelete(item);

  }

  _getItemToDelete(itemToDelete) {
    this._itemToDelete = itemToDelete;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._deleteMethod(this._itemToDelete);
    })
  }
  
  changeButtonText(saveBtnText) {
    this._saveBtn.textContent = saveBtnText;
  }
}