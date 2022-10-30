let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.pop-up__input_type_name');
let descriptionInput = document.querySelector('.pop-up__input_type_description');

let galleryPhoto;
let galleryPlaceName;
let photoInput;
let placeNameInput;

let editForm = document.querySelector('.pop-up__form_type_edit');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButton = document.querySelector('.pop-up__close-button');
let overlay = document.querySelector('.pop-up__overlay');
let popUpEdit = document.querySelector('.pop-up_edit-profile');
let popUpAdd = document.querySelector('.pop-up_add-place')

function showPopUpEdit() {
  popUpEdit.classList.remove('pop-up_visability');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function showPopUpAdd() {
  popUpAdd.classList.remove('pop-up_visability');

}

function hidePopUp() {
  popUpEdit.classList.add('pop-up_visability');
  popUpAdd.classList.add('pop-up_visability');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;
  hidePopUp();
}

editButton.addEventListener('click', showPopUpEdit);
editForm.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', showPopUpAdd);

closeButton.addEventListener('click', hidePopUp);
overlay.addEventListener('click', hidePopUp);
