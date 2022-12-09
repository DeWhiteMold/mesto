import Card from './modules/cardCreator.js';
import FormValidator from './modules/validation.js';
import Section from './modules/section.js';
import PopUpWithImage from './modules/popUpWithImage.js';
import PopUpWithForm from './modules/popUpWithForm.js';
import UserInfo from './modules/userInfo.js';

import { settings, profileName, profileDescription, nameInput, descriptionInput, 
  buttonEdit, buttonAdd, placeTamplate, initialCards, forms } from './modules/data.js';

const userInfo = new UserInfo('.profile__name', '.profile__description');

const newCardPopUp = new PopUpWithForm(
    '.pop-up_add-place',
    (inputsValues) => {
      const card = new Card(
        inputsValues["place-name"], 
        inputsValues["place-image"], 
        placeTamplate, 
        (evt) => {imagePopUp.open(evt)}
      );
      const newCard = card.createCard();
      cardGallery.addItem(newCard);
    }
   );

const profilePopUp = new PopUpWithForm(
    '.pop-up_edit-profile',
    (inputsValues) => {
      userInfo.setUserInfo(inputsValues.name, inputsValues.description);
      const userData = userInfo.getUserInfo();
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.description
    }
  );

const imagePopUp = new PopUpWithImage('.photo-pop-up');

newCardPopUp.setEventListeners();
profilePopUp.setEventListeners();
imagePopUp.setEventListeners();

buttonAdd.addEventListener('click', () => {newCardPopUp.open()})

buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;

  profilePopUp.open();
})

const cardGallery = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, 
        item.link, 
        placeTamplate, 
        (evt) => {imagePopUp.open(evt)}
      );
      const newCard = card.createCard();
      cardGallery.addItem(newCard);
    }
  },
  '.gallery__table'
)

cardGallery.renderItems();

forms.forEach((form) => {
  const formValidator = new FormValidator(settings, form);
  formValidator.enebleValidation();
})
