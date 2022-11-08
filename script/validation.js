
const settings = {
  formSelector: 'pop-up__form',
  inputSelector: 'pop-up__input',
  submitButtonSelector: 'pop-up__save-button',
  inactiveButtonClass: 'pop-up__save-button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error'
};

console.log(document.querySelector('.pop-up__form'));
// console.log(document.querySelector(`${}`));

const showError = (form, formInput, errorText) => {
  const errorMessage = form.querySelector(`.${formInput.name}-error`);
  formInput.classList.add(`${settings.inputErrorClass}`);
  errorMessage.textContent = errorText;
};

const hideError = (form, formInput) => {
  const errorMessage = form.querySelector(`.${formInput.name}-error`);
  formInput.classList.remove(`${settings.inputErrorClass}`);
  errorMessage.textContent = '';
};

const isValid = (form, formInput) => {
  if(!formInput.validity.valid) {
    showError(form, formInput, formInput.validationMessage);
  }
  else {
    hideError(form, formInput);
  }
};

const hasInvalidImput = (formInputs) => {
  return formInputs.some((input) => {
    return !input.validity.valid;
  });
}

const changeButtonState = (formInputs, saveButton) => {
  if(hasInvalidImput(formInputs)) {
    saveButton.classList.add(`${settings.inactiveButtonClass}`);
    saveButton.setAttribute('disabled', true);
  }
  else {
    saveButton.classList.remove(`${settings.inactiveButtonClass}`);
    saveButton.removeAttribute('disabled');
  }
}

const addListeners = (form) => {
  const formInputs = Array.from(form.querySelectorAll(`.${settings.inputSelector}`));
  const saveButton = form.querySelector(`.${settings.submitButtonSelector}`);
  changeButtonState(formInputs, saveButton);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      changeButtonState(formInputs, saveButton);
    });
  });
};

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(`.${settings.formSelector}`));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    addListeners(form);
  })
}

enableValidation(settings);

