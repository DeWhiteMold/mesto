import Card from './modules/cardCreator.js';
import FormValidator from './modules/validation.js';

const settings = {
  formSelector: 'pop-up__form',
  inputSelector: 'pop-up__input',
  submitButtonSelector: 'pop-up__save-button',
  inactiveButtonClass: 'pop-up__save-button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error'
};

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.pop-up__input_type_name');
const descriptionInput = document.querySelector('.pop-up__input_type_description');

const formEdit = document.querySelector('.pop-up__form_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popUpEdit = document.querySelector('.pop-up_edit-profile');
const popUpAdd = document.querySelector('.pop-up_add-place');

const gallery = document.querySelector('.gallery__table');
const formAdd = document.querySelector('.pop-up__form_type_add');
const placeTamplate = document.querySelector('#place').content;

const photoPopUp = document.querySelector('.photo-pop-up');
const photoPopUpImage = photoPopUp.querySelector('.photo-pop-up__image');

const photoInput = document.querySelector('.pop-up__input_type_place-image');
const placeNameInput = document.querySelector('.pop-up__input_type_place-name');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopUp(popup) {
    popup.classList.remove('pop-up_visability');
    popup.classList.add('pop-up_opend');

    if(popup.querySelector('.pop-up__save-button')) {
      const saveButton = popup.querySelector('.pop-up__save-button');
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add(`${settings.inactiveButtonClass}`);
    }

    document.addEventListener('keydown', setKeyHandler);
}

buttonEdit.addEventListener('click', function() {

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopUp(popUpEdit);
});

buttonAdd.addEventListener('click', function() {
  openPopUp(popUpAdd);
});
formAdd.addEventListener('submit', addPlace);

const allCloseButtons = document.querySelectorAll('.pop-up__close-button');

function hidePopUp(popup) {
  popup.classList.add('pop-up_visability');
  popup.classList.remove('pop-up_opend');
  document.removeEventListener('keydown', setKeyHandler);
}

allCloseButtons.forEach(function(button){
  button.addEventListener('click', function() {
    hidePopUp(button.closest('.pop-up'));
  })
})

function setKeyHandler(evt) {
  if(evt.key === 'Escape') {
    hidePopUp(document.querySelector('.pop-up_opend'));
  }
}


function submitProfileChange(evt) {
  evt.preventDefault();

  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;

  hidePopUp(popUpEdit);}

function addPlace(evt) {
  evt.preventDefault();

  const userPlace = new Card(placeNameInput.value, photoInput.value, placeTamplate);
  gallery.prepend(userPlace.createCard());
  hidePopUp(popUpAdd);
  formAdd.reset();
}

initialCards.forEach(function(place){
  const userPlace = new Card(place.name, place.link, placeTamplate);

  gallery.prepend(userPlace.createCard());
})

formEdit.addEventListener('submit', submitProfileChange);


document.querySelector('.content').addEventListener('click', (evt) => {
  if(evt.target.classList.contains('pop-up__overlay')) {
    hidePopUp(evt.target.closest('.pop-up'));
  }
})

const forms = Array.from(document.querySelectorAll(`.${settings.formSelector}`))
forms.forEach((form) => {
  const formValidator = new FormValidator(settings, form);
  formValidator.enebleValidation();
})

export {photoPopUp, photoPopUpImage, openPopUp, settings};
