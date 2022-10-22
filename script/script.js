let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.pop-up__input_type_name');
let descriptionInput = document.querySelector('.pop-up__input_type_description');

let editForm = document.querySelector('.pop-up__edit-form');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.pop-up__close-button');
let overlay = document.querySelector('.pop-up__overlay');
let popUp = document.querySelector('.pop-up');

function showPopUp() {
  popUp.classList.remove('pop-up_visability');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function hidePopUp() {
  popUp.classList.add('pop-up_visability');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;
  hidePopUp();
}

editButton.addEventListener('click', showPopUp);
popUp.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', hidePopUp);
overlay.addEventListener('click', hidePopUp);
