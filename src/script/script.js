import Card from './modules/Card.js';
import FormValidator from './modules/FormValidator.js';
import Section from './modules/section.js';
import PopUpWithImage from './modules/popUpWithImage.js';
import PopUpWithForm from './modules/popUpWithForm.js';
import UserInfo from './modules/userInfo.js';

import { settings, profileName, profileDescription, nameInput, descriptionInput, placeAddBtn, 
  buttonEdit, buttonAdd, placeTamplate, initialCards, formAdd, formEdit } from './modules/data.js';

const userInfo = new UserInfo('.profile__name', '.profile__description');

const createCard = (placeName, placeImg) => {
  const card = new Card(placeName, placeImg, placeTamplate, (evt) => {imagePopUp.open(evt)});
  const newCard = card.createCard();

  return newCard;
}

const newCardPopUp = new PopUpWithForm(
    '.pop-up_add-place',
    (inputsValues) => {
      const newCard = createCard(inputsValues["place-name"], inputsValues["place-image"]);
      cardGallery.addItem(newCard);
    }
   );

const profilePopUp = new PopUpWithForm(
    '.pop-up_edit-profile',
    (inputsValues) => {
      userInfo.setUserInfo(inputsValues.name, inputsValues.description);
      const userData = userInfo.getUserInfo();
      // Здесь данные вставляются на саму страницу, а не в инпуты (оставить комментарий в коде сказал наставник)
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.description;
    }
  );

const imagePopUp = new PopUpWithImage('.photo-pop-up');

newCardPopUp.setEventListeners();
profilePopUp.setEventListeners();
imagePopUp.setEventListeners();

buttonAdd.addEventListener('click', () => {
  newCardPopUp.open();
  placeAddBtn.setAttribute('disabled', true);
  placeAddBtn.classList.add(settings.inactiveButtonClass);
})

buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  // Здесь данные вставляются в интпуты
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;

  profilePopUp.open();
})

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

cardGallery.renderItems();

const formAddValidation = new FormValidator(settings, formAdd);
const formEditValidation = new FormValidator(settings, formEdit);

formAddValidation.enebleValidation();
formEditValidation.enebleValidation();
