
const settings = {
  formSelector: 'pop-up__form',
  inputSelector: 'pop-up__input',
  submitButtonSelector: 'pop-up__save-button',
  inactiveButtonClass: 'pop-up__save-button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error'
};

const showError = (form, formInput, errorText, settings) => {
  const errorMessage = form.querySelector(`.${formInput.name}-error`);
  formInput.classList.add(settings.inputErrorClass);
  errorMessage.textContent = errorText;
};

const hideError = (form, formInput, settings) => {
  const errorMessage = form.querySelector(`.${formInput.name}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  errorMessage.textContent = '';
};

const isValid = (form, formInput, settings) => {
  if(!formInput.validity.valid) {
    showError(form, formInput, formInput.validationMessage, settings);
  }
  else {
    hideError(form, formInput, settings);
  }
};

const hasInvalidImput = (formInputs) => {
  return formInputs.some((input) => {
    return !input.validity.valid;
  });
}

const changeButtonState = (formInputs, saveButton, settings) => {
  if(hasInvalidImput(formInputs)) {
    saveButton.classList.add(settings.inactiveButtonClass);
    saveButton.setAttribute('disabled', true);
  }
  else {
    saveButton.classList.remove(settings.inactiveButtonClass);
    saveButton.removeAttribute('disabled');
  }
}

const addListeners = (form, settings) => {
  const formInputs = Array.from(form.querySelectorAll(`.${settings.inputSelector}`));
  const saveButton = form.querySelector(`.${settings.submitButtonSelector}`);
  changeButtonState(formInputs, saveButton, settings);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, settings);
      changeButtonState(formInputs, saveButton, settings);
    });
  });
};

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(`.${settings.formSelector}`));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    addListeners(form, settings);
  })
}

enableValidation(settings);

