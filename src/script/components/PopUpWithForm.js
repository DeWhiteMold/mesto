import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, submitForm) {
    super(popUpSelector)
    this._submitForm = submitForm;
    this._form = this._popUp.querySelector('.pop-up__form');
    this._inputs = Array.from(this._popUp.querySelectorAll('.pop-up__input'));
    this._saveBtn = this._form.querySelector('.pop-up__save-button');
    this._inputsData = {};
  }

  _getInputValues() {
    this._inputs.forEach((input) => {
      this._inputsData[input.name] =  input.value;
    })
    return this._inputsData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()

      const inputsValues = this._getInputValues();
      this._submitForm(inputsValues);
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  changeButtonText(saveBtnText) {
    this._saveBtn.textContent = saveBtnText;
  }
}