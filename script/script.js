const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.pop-up__input_type_name');
const descriptionInput = document.querySelector('.pop-up__input_type_description');

const editForm = document.querySelector('.pop-up__form_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpEdit = document.querySelector('.pop-up_edit-profile');
const popUpAdd = document.querySelector('.pop-up_add-place');

const photoInput = document.querySelector('.pop-up__input_type_place-image');
const placeNameInput = document.querySelector('.pop-up__input_type_place-name');
const gallery = document.querySelector('.gallery__table');
const addForm = document.querySelector('.pop-up__form_type_add');
const placeTamplate = document.querySelector('#place').content;

const photoPopUp = document.querySelector('.photo-pop-up');
const photoPopUpImg = photoPopUp.querySelector('.photo-pop-up__image');
const photoPopUpName = photoPopUp.querySelector('.photo-pop-up__description');

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

const openButtons = document.querySelectorAll('.open-button')

function openPopUp(popup) {
    popup.classList.remove('pop-up_visability');
}

editButton.addEventListener('click', function() {

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopUp(popUpEdit);
});

addButton.addEventListener('click', function() {
  photoInput.value = '';
  placeNameInput.value = '';
  openPopUp(popUpAdd);
});

const allCloseButtons = document.querySelectorAll('.pop-up__close-button');

function hidePopUp(popup) {
  popup.classList.add('pop-up_visability');
}

allCloseButtons.forEach(function(button){
  button.addEventListener('click', function() {
    hidePopUp(button.closest('.pop-up'));
  })
})

function submitProfileChange (evt) {
  evt.preventDefault();

  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;

  hidePopUp(popUpEdit);}

function createCard(name, photo) {
  const userPlace = placeTamplate.querySelector('.gallery__place').cloneNode(true);

  userPlace.querySelector('.gallery__place-name').textContent = name;
  userPlace.querySelector('.gallery__photo').src = photo;
  userPlace.querySelector('.gallery__photo').alt = name + ' фото';

  userPlace.querySelector('.gallery__place-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__place-like_active');
  });

  userPlace.querySelector('.gallery__photo').addEventListener('click', function(evt){
      openPopUp(photoPopUp);
      photoPopUpImg.src = userPlace.querySelector('.gallery__photo').src;
      photoPopUpName.textContent = userPlace.querySelector('.gallery__place-name').textContent;
      photoPopUpImg.alt = userPlace.querySelector('.gallery__place-name').textContent + ' фото';
 });

  userPlace.querySelector('.gallery__place-remove').addEventListener('click', function(evt){
    userPlace.remove();
  })

  return userPlace;
}

function addPlace (evt) {
  evt.preventDefault();

  userPlace = createCard(placeNameInput.value, photoInput.value);

  gallery.prepend(userPlace);
  hidePopUp(popUpAdd)
}

initialCards.forEach(function(place){
  userPlace = createCard(place.name, place.link);

  gallery.prepend(userPlace);
})

editForm.addEventListener('submit', submitProfileChange);
addForm.addEventListener('submit', addPlace);
