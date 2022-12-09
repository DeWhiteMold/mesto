export default class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
    this._formInput = this._form.querySelector(`.${this._inputSelector}`);
  }

  _showError(input) {
    const errorMessage = this._form.querySelector(`.${input.name}-error`);
    input.classList.add(this._inputErrorClass);
    errorMessage.textContent = input.validationMessage;
  }

  _hideError(input) {
    const errorMessage = this._form.querySelector(`.${input.name}-error`);
    input.classList.remove(this._inputErrorClass);
    errorMessage.textContent = '';
  }

  _isValid(input) {
    if(!input.validity.valid) {
      this._showError(input);
    }
    else {
      this._hideError(input);
    }
  }

  _hasInvalidInput() {
    return this._formInputs.some((input) => {
      return !input.validity.valid;
    })
  }

  _changeButtonState() {
    if(this._hasInvalidInput()) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.setAttribute('disabled', true);
    }
    else {
      this._saveButton.classList.remove(this._inactiveButtonClass);
      this._saveButton.removeAttribute('disabled');
    }
  }

  _addListeners() {
    this._formInputs = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
    this._saveButton = this._form.querySelector(`.${this._submitButtonSelector}`);
    this._changeButtonState();
    this._formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._changeButtonState();
      })
    })
  }

  enebleValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._addListeners();
    this._saveButton.setAttribute('disabled', true);
  }
}