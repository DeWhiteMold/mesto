import Card from './modules/Card.js';
import FormValidator from './modules/FormValidator.js';
import Section from './modules/section.js';
import PopUpWithImage from './modules/popUpWithImage.js';
import PopUpWithForm from './modules/popUpWithForm.js';
import UserInfo from './modules/userInfo.js';

import { settings, nameInput, descriptionInput, buttonEdit, buttonAdd, 
  placeTamplate, initialCards, formAdd, formEdit } from './modules/data.js';

  

//функции

const createCard = (placeName, placeImg) => {
  const card = new Card(placeName, placeImg, placeTamplate, (evt) => {imagePopUp.open(evt)});
  const newCard = card.createCard();

  return newCard;
}



//Экземляры классов

const cardGallery = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createCard(item.name, item.link);
      cardGallery.addItem(newCard);
    }
  },
  '.gallery__table'
)

const userInfo = new UserInfo('.profile__name', '.profile__description');

const profilePopUp = new PopUpWithForm(
    '.pop-up_edit-profile',
    (inputsValues) => {
      userInfo.setUserInfo(inputsValues.name, inputsValues.description);
    }
  );

const newCardPopUp = new PopUpWithForm(
    '.pop-up_add-place',
    (inputsValues) => {
      const newCard = createCard(inputsValues["place-name"], inputsValues["place-image"]);
      cardGallery.addItem(newCard);
    }
   );

const imagePopUp = new PopUpWithImage('.photo-pop-up');

const formAddValidation = new FormValidator(settings, formAdd);
const formEditValidation = new FormValidator(settings, formEdit);



//Вызовы методов классов

cardGallery.renderItems();

newCardPopUp.setEventListeners();
profilePopUp.setEventListeners();
imagePopUp.setEventListeners();

formEditValidation.enebleValidation();



//Добавление слушателей

buttonAdd.addEventListener('click', () => {
  newCardPopUp.open();
  
  formAddValidation.enebleValidation();
})

buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;

  profilePopUp.open();
})
