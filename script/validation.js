
const settings = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: 'pop-up__save-button',
  inactiveButtonClass: 'pop-up__save-button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error'
};

const showError = (form, formInput, errorText) => {
  const errorMessage = form.querySelector(`.${formInput.name}-error`);
  formInput.classList.add('pop-up__input_type_error');
  errorMessage.textContent = errorText;
};

const hideError = (form, formInput) => {
  const errorMessage = form.querySelector(`.${formInput.name}-error`);
  formInput.classList.remove('pop-up__input_type_error');
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
    saveButton.classList.add('pop-up__close-button_disabled');
    saveButton.setAttribute('disabled', true);
  }
  else {
    saveButton.classList.remove('pop-up__close-button_disabled');
    saveButton.removeAttribute('disabled');
  }
}

const addListeners = (form) => {
  const formInputs = Array.from(form.querySelectorAll('.pop-up__input'));
  const saveButton = form.querySelector('.pop-up__save-button');
  changeButtonState(formInputs, saveButton);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      changeButtonState(formInputs, saveButton);
    });
  });
};

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    addListeners(form);
  })
}

enableValidation(settings);

