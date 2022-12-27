import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopUpWithImage from './components/PopUpWithImage.js';
import PopUpWithForm from './components/PopUpWithForm.js';
import UserInfo from './components/UserInfo.js';
import PopUpWithSubmitDelete from './components/PopUpWithSubmitDelete.js';
import Api from './components/Api.js';

import { settings, nameInput, 
  descriptionInput, buttonAvatar, buttonEdit, buttonAdd, 
  formAvatar, formAdd, formEdit, apiOption } from './components/data.js';



const api = new Api(apiOption);

let userId = '';

Promise.all([

  api.getUserInfo(),

  api.getInitialCards()

  ])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
    cardGallery.renderItems(cardsData);
  })
  .catch((err)=>{ console.log(err) }) 

  

//функции

const createCard = (data) => {
  const card = new Card(
    data,
    userId,
    '#place', 
    (evt) => {imagePopUp.open(card)},
    () => {
      replacementCardPopUp.open(card);
    },
    () => {
      api.addLike(card.cardId)
        .then((res) => {
          card.setAmountOfLikes(res);
        })
        .then(() => { card.addLike() })
        .catch((err) => { console.log(err) });
    },
    () => {
      api.deleteLike(card.cardId)
      .then((res) => {
        card.setAmountOfLikes(res);
      })
      .then(() => { card.deleteLike() })
      .catch((err) => { console.log(err) });
    }
    );
  const newCard = card.createCard();

  return newCard;
}



//Экземляры классов

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__photo');

const cardGallery = new Section(
  '.gallery__table', 
  (item) => {
    const newCard = createCard(item)
    cardGallery.addItem(newCard);
  }
);

const avatarPopUp = new PopUpWithForm(
    '.pop-up_change-avatar',
    (inputsValues) => {
      avatarPopUp.changeButtonText('Сохранение...');
      api.updateUsetAvatar(inputsValues.avatar)
        .then((res) => { userInfo.setUserAvatar(res.avatar) })
        .then(() => { avatarPopUp.close() })
        .catch((err) => { console.log(err) })
        .finally(() => { avatarPopUp.changeButtonText('Сохранить') })
    }
  )

const profilePopUp = new PopUpWithForm(
    '.pop-up_edit-profile',
    (inputsValues) => {
      profilePopUp.changeButtonText('Сохранение...');
      api.updateUsetInfo(inputsValues.name, inputsValues.description)
        .then((res) => { 
          userInfo.setUserInfo(res.name, res.about)
        })
        .then(() => { profilePopUp.close() })
        .catch((err) => { console.log(err) })
        .finally(() => { profilePopUp.changeButtonText('Сохранить') })
    }
  );

const newCardPopUp = new PopUpWithForm(
    '.pop-up_add-place',
    (inputsValues) => {
      newCardPopUp.changeButtonText('Сохранение...');
      api.postNewCard(inputsValues["place-name"], inputsValues["place-image"])
        .then((res) => {
          const newCard = createCard(res);
          cardGallery.addItem(newCard);
        })
        .then(() => { newCardPopUp.close() })
        .catch((err) => { console.log(err) })
        .finally(() => { newCardPopUp.changeButtonText('Создать') })
    }
   );

   const replacementCardPopUp = new PopUpWithSubmitDelete(
    '.delete-card-pop-up',
    (item) => {
      replacementCardPopUp.changeButtonText('Удаление...');
      api.deleteCard(item.cardId)
        .then(() => { item.removeCard() })
        .then(() => { replacementCardPopUp.close() })
        .catch((err) => { console.log(err) })
        .finally(() => { replacementCardPopUp.changeButtonText('Да')})
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
