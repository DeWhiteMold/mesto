let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.pop-up__input_type_name');
let descriptionInput = document.querySelector('.pop-up__input_type_description');

let editForm = document.querySelector('.pop-up__form_type_edit');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeEditButton = document.querySelector('.pop-up__close-button_edit');
let overlay = document.querySelector('.pop-up__overlay');
let popUpEdit = document.querySelector('.pop-up_edit-profile');
let popUpAdd = document.querySelector('.pop-up_add-place');

let photoInput = document.querySelector('.pop-up__input_type_place-image');
let placeNameInput = document.querySelector('.pop-up__input_type_place-name');
let gallery = document.querySelector('.gallery__table');
let addForm = document.querySelector('.pop-up__form_type_add');
const placeTamplate = document.querySelector('#place').content;

let closeAddButton = document.querySelector('.pop-up__close-button_add');

const photoPopUp = document.querySelector('.photo-pop-up');
const photoCloseButton = document.querySelector('.photo-pop-up__close-button');


const initialCards = [
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

function showPopUpEdit() {
  popUpEdit.classList.remove('pop-up_visability');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function showPopUpAdd() {
  popUpAdd.classList.remove('pop-up_visability');
  photoInput.value = '';
  placeNameInput.value = '';
}


function hidePopUp() {
  popUpEdit.classList.add('pop-up_visability');
  popUpAdd.classList.add('pop-up_visability');
  photoPopUp.classList.add('photo-pop-up_visability');
}


function formSubmitProfile (evt) {
  evt.preventDefault();

  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;

  hidePopUp();
}


initialCards.forEach(function(place) {
  const userPlace = placeTamplate.querySelector('.gallery__place').cloneNode(true);

  userPlace.querySelector('.gallery__place-name').textContent = place.name;
  userPlace.querySelector('.gallery__photo').src = place.link;

  userPlace.querySelector('.gallery__place-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__place-like_active');
  });

  userPlace.querySelector('.gallery__photo').addEventListener('click', function(evt){
    function showPhotoPopUp() {
      photoPopUp.classList.remove('pop-up_visability');
      photoPopUp.querySelector('.photo-pop-up__image').src = userPlace.querySelector('.gallery__photo').src;
      photoPopUp.querySelector('.photo-pop-up__description').textContent = userPlace.querySelector('.gallery__place-name').textContent;
    }
    showPhotoPopUp();
  })

  userPlace.querySelector('.gallery__place-remove').addEventListener('click', function(evt){
    userPlace.remove();
  })

  gallery.prepend(userPlace);
})


function addPlace (evt) {
  evt.preventDefault();
  const userPlace = placeTamplate.querySelector('.gallery__place').cloneNode(true);

  userPlace.querySelector('.gallery__place-name').textContent = placeNameInput.value;
  userPlace.querySelector('.gallery__photo').src = photoInput.value;

  userPlace.querySelector('.gallery__place-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__place-like_active');
  });

  userPlace.querySelector('.gallery__photo').addEventListener('click', function(evt){
    function showPhotoPopUp() {
      photoPopUp.classList.remove('pop-up_visability');
      photoPopUp.querySelector('.photo-pop-up__image').src = userPlace.querySelector('.gallery__photo').src;
      photoPopUp.querySelector('.photo-pop-up__description').textContent = userPlace.querySelector('.gallery__place-name').textContent;
    }
    showPhotoPopUp();
  })

  userPlace.querySelector('.gallery__place-remove').addEventListener('click', function(evt){
    userPlace.remove();
  })

  gallery.prepend(userPlace);
  hidePopUp();
}


editButton.addEventListener('click', showPopUpEdit);
editForm.addEventListener('submit', formSubmitProfile);
addButton.addEventListener('click', showPopUpAdd);
closeAddButton.addEventListener('click', hidePopUp);
closeEditButton.addEventListener('click', hidePopUp);
photoCloseButton.addEventListener('click', hidePopUp);
overlay.addEventListener('click', hidePopUp);
addForm.addEventListener('submit', addPlace);
