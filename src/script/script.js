import Card from './modules/Card.js';
import FormValidator from './modules/FormValidator.js';
import Section from './modules/section.js';
import PopUpWithImage from './modules/popUpWithImage.js';
import PopUpWithForm from './modules/popUpWithForm.js';
import UserInfo from './modules/userInfo.js';
import PopUpWithSubmitDelete from './modules/popUpWithSubmitDelete.js';

import { settings, photoInput, nameInput, descriptionInput, buttonAvatar, buttonEdit, buttonAdd, 
  placeTamplate, initialCards, formAvatar, formAdd, formEdit } from './modules/data.js';

  

//функции

const createCard = (placeName, placeImg) => {
  const card = new Card(
    placeName, 
    placeImg, 
    placeTamplate, 
    (evt) => {imagePopUp.open(evt)},
    () => {
      replacementCardPopUp.open(card);
    }
    );
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

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__photo');

const avatarPopUp = new PopUpWithForm(
    '.pop-up_change-avatar',
    (inputsValues) => {
      userInfo.setUserPhoto(inputsValues.avatar);
    }
  )

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

const replacementCardPopUp = new PopUpWithSubmitDelete(
    '.delete-card-pop-up',
    (item) => {
      const itemToDelete = item;
      itemToDelete.removeCard()
    }
  )

const imagePopUp = new PopUpWithImage('.photo-pop-up');

const formAvatarValidation = new FormValidator(settings, formAvatar);
const formAddValidation = new FormValidator(settings, formAdd);
const formEditValidation = new FormValidator(settings, formEdit);



//Вызовы методов классов

cardGallery.renderItems();

avatarPopUp.setEventListeners();
newCardPopUp.setEventListeners();
profilePopUp.setEventListeners();
imagePopUp.setEventListeners();
replacementCardPopUp.setEventListeners();

formAvatarValidation.enebleValidation();
formEditValidation.enebleValidation();
formAddValidation.enebleValidation();



//Добавление слушателей

buttonAvatar.addEventListener('click', () => {
  const userPhoto = userInfo.getUserPhoto();

  photoInput.value = userPhoto;

  avatarPopUp.open();
})

buttonAdd.addEventListener('click', () => {
  newCardPopUp.open();
  
  formAddValidation.changeButtonState();
})

buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  descriptionInput.value = userData.description;

  profilePopUp.open();
})
