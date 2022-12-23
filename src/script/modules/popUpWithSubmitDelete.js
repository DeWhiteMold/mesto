import PopUp from "./popUp.js";

export default class PopUpWithSubmitDelete extends PopUp {
  constructor(popUpSelector, deleteMethod) {
    super(popUpSelector);
    this._deleteMethod = deleteMethod;
    this._form = this._popUp.querySelector('.pop-up__form');
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
      this._itemToDelete = null;

      this.close();
    })
  }
  
  changeButtonStateToSaving() {
    this._saveBtn.textContent = 'Удаление...'
  }

  changeButtonStateToNormal() {
    this._saveBtn.textContent = 'Да'
  }
}