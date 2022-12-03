export const settings = {
  formSelector: 'pop-up__form',
  inputSelector: 'pop-up__input',
  submitButtonSelector: 'pop-up__save-button',
  inactiveButtonClass: 'pop-up__save-button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error'
};

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.pop-up__input_type_name');
export const descriptionInput = document.querySelector('.pop-up__input_type_description');

export const formEdit = document.querySelector('.pop-up__form_type_edit');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const popUpEdit = document.querySelector('.pop-up_edit-profile');
export const popUpAdd = document.querySelector('.pop-up_add-place');

export const gallery = document.querySelector('.gallery__table');
export const formAdd = document.querySelector('.pop-up__form_type_add');
export const placeTamplate = document.querySelector('#place').content;

export const photoPopUp = document.querySelector('.photo-pop-up');
export const photoPopUpImage = photoPopUp.querySelector('.photo-pop-up__image');

export const photoInput = document.querySelector('.pop-up__input_type_place-image');
export const placeNameInput = document.querySelector('.pop-up__input_type_place-name');

export const allCloseButtons = document.querySelectorAll('.pop-up__close-button');

export const initialCards = [
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

export const forms = Array.from(document.querySelectorAll(`.${settings.formSelector}`));