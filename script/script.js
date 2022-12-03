import Card from './modules/cardCreator.js';
import FormValidator from './modules/validation.js';
import { settings, profileName, profileDescription, nameInput, descriptionInput,
formEdit, buttonEdit, buttonAdd, popUpEdit, popUpAdd, gallery, formAdd, placeTamplate,
photoPopUp, photoPopUpImage, photoInput, placeNameInput, initialCards, forms, allCloseButtons } from './modules/data.js';



function openPopUp(popup) {
    popup.classList.remove('pop-up_visability');
    popup.classList.add('pop-up_opend');

    document.addEventListener('keydown', setKeyHandler);
}

function hidePopUp(popup) {
  popup.classList.add('pop-up_visability');
  popup.classList.remove('pop-up_opend');
  document.removeEventListener('keydown', setKeyHandler);
}

function setKeyHandler(evt) {
  if(evt.key === 'Escape') {
    hidePopUp(document.querySelector('.pop-up_opend'));
  }
}

function submitProfileChange(evt) {
  evt.preventDefault();

  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;

  hidePopUp(popUpEdit);
}

function generateCard(name, photo, tamplate) {
  const userPlace = new Card(name, photo, tamplate);
  return userPlace.createCard();
}

function addPlace(evt) {
  evt.preventDefault();

  gallery.prepend(generateCard(placeNameInput.value, photoInput.value, placeTamplate));
  hidePopUp(popUpAdd);
  formAdd.reset();
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

formEdit.addEventListener('submit', submitProfileChange);

document.querySelector('.content').addEventListener('click', (evt) => {
  if(evt.target.classList.contains('pop-up__overlay')) {
    hidePopUp(evt.target.closest('.pop-up'));
  }
})



initialCards.forEach(function(place){
  gallery.prepend(generateCard(place.name, place.link, placeTamplate));
})

forms.forEach((form) => {
  const formValidator = new FormValidator(settings, form);
  formValidator.enebleValidation();
})

allCloseButtons.forEach(function(button){
  button.addEventListener('click', function() {
    hidePopUp(button.closest('.pop-up'));
  })
})

export {photoPopUp, photoPopUpImage, openPopUp, settings};
