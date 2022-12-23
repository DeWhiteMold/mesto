export const settings = {
  formSelector: 'pop-up__form',
  inputSelector: 'pop-up__input',
  submitButtonSelector: 'pop-up__save-button',
  inactiveButtonClass: 'pop-up__save-button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error'
};

export const photoInput = document.querySelector('.pop-up__input_type_avatar');
export const nameInput = document.querySelector('.pop-up__input_type_name');
export const descriptionInput = document.querySelector('.pop-up__input_type_description');

export const formAvatar = document.querySelector('.pop-up__form_type_avatar');
export const formAdd = document.querySelector('.pop-up__form_type_add');
export const formEdit = document.querySelector('.pop-up__form_type_edit');

export const buttonAvatar = document.querySelector('.profile__change-avatar-btn');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

export const placeTamplate = document.querySelector('#place').content;

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

export const apiOption = {
  cohort: 'cohort-56',
  token: '9cb52c99-f67f-46e2-9334-b1984a2ebddd',
  serverLink: 'https://mesto.nomoreparties.co/v1'
}