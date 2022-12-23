import Card from './modules/Card.js';
import FormValidator from './modules/FormValidator.js';
import Section from './modules/section.js';
import PopUpWithImage from './modules/popUpWithImage.js';
import PopUpWithForm from './modules/popUpWithForm.js';
import UserInfo from './modules/userInfo.js';
import PopUpWithSubmitDelete from './modules/popUpWithSubmitDelete.js';
import Api from './modules/Api.js';

import { settings, photoInput, nameInput, descriptionInput, buttonAvatar, buttonEdit, buttonAdd, 
  placeTamplate, initialCards, formAvatar, formAdd, formEdit, apiOption } from './modules/data.js';



const api = new Api(apiOption);

let userId = ''; 

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserPhoto(res.avatar);
    userId = res._id;
  })


const cardGallery = new Section('.gallery__table');


api.getInitialCards()
  .then((res) => {(
    cardGallery.renderItems({
      items: res,
      renderer: (item) => {
        const newCard = createCard(item)
        cardGallery.addItem(newCard);
      }
    })
  )
})

  

//функции

const createCard = (data) => {
  const card = new Card(
    data,
    placeTamplate, 
    (evt) => {imagePopUp.open(evt)},
    () => {
      replacementCardPopUp.open(newCard);
    }
    );
  const newCard = card.createCard();
  
  newCard.__proto__ = card;
  
  if(newCard.ownerId === userId) {
    newCard.showRemoveBtn();
  }

  return newCard;
}





//Экземляры классов



const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__photo');

const avatarPopUp = new PopUpWithForm(
    '.pop-up_change-avatar',
    (inputsValues) => {
      userInfo.setUserPhoto(inputsValues.avatar);
      api.updateUsetAvatar(inputsValues.avatar);
    }
  )

const profilePopUp = new PopUpWithForm(
    '.pop-up_edit-profile',
    (inputsValues) => {
      userInfo.setUserInfo(inputsValues.name, inputsValues.description);
      api.updateUsetInfo(inputsValues.name, inputsValues.description);
    }
  );

const newCardPopUp = new PopUpWithForm(
    '.pop-up_add-place',
    (inputsValues) => {
      api.postNewCard(inputsValues["place-name"], inputsValues["place-image"])
        .then((res) => {
          const newCard = createCard(res);
          cardGallery.addItem(newCard);
        });
    }
   );

   const replacementCardPopUp = new PopUpWithSubmitDelete(
    '.delete-card-pop-up',
    (item) => {
      api.deleteCard(item.cardId)
        .then(() => {item.removeCard()})
    }
  )

const imagePopUp = new PopUpWithImage('.photo-pop-up');

const formAvatarValidation = new FormValidator(settings, formAvatar);
const formAddValidation = new FormValidator(settings, formAdd);
const formEditValidation = new FormValidator(settings, formEdit);



//Вызовы методов классов


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
