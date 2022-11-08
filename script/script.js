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
const photoPopUpImage = photoPopUp.querySelector('.photo-pop-up__image');

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

function openPopUp(popup) {
    popup.classList.remove('pop-up_visability');
    document.addEventListener('keydown', keyHandler);
}

editButton.addEventListener('click', function() {

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopUp(popUpEdit);
});

addButton.addEventListener('click', function() {
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

function keyHandler(evt) {
  if(evt.key === 'Escape') {
    document.querySelectorAll('.pop-up').forEach((popup => {
      if(!popup.classList.contains('.pop-up_visability')) {
        hidePopUp(popup);
        document.removeEventListener('keydown', keyHandler);
      }
    }))
  }
}

function submitProfileChange (evt) {
  evt.preventDefault();

  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;

  hidePopUp(popUpEdit);}

gallery.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('gallery__photo')) {
    openPopUp(photoPopUp);
    photoPopUpImage.src = evt.target.src;
    photoPopUp.querySelector('.photo-pop-up__description').textContent = evt.target.closest('.gallery__place').textContent;
    photoPopUpImage.alt = `${evt.target.closest('.gallery__place').textContent} фото`;
  }
  else if(evt.target.classList.contains('gallery__place-like')) {
    evt.target.classList.toggle('gallery__place-like_active');
  }
  else if(evt.target.classList.contains('gallery__place-remove')) {
    evt.target.closest('.gallery__place').remove();
  }
})

function createCard(name, photo) {
  const userPlace = placeTamplate.querySelector('.gallery__place').cloneNode(true);

  const placePhoto = userPlace.querySelector('.gallery__photo')
  userPlace.querySelector('.gallery__place-name').textContent = name;
  placePhoto.src = photo;
  placePhoto.alt = `${name} фото`;

  return userPlace;
}

function addPlace (evt) {
  evt.preventDefault();

  const userPlace = createCard(placeNameInput.value, photoInput.value);

  gallery.prepend(userPlace);
  addForm.reset();
  addForm.removeEventListener('submit', addPlace);
  hidePopUp(popUpAdd)
}

initialCards.forEach(function(place){
  const userPlace = createCard(place.name, place.link);

  gallery.prepend(userPlace);
})

editForm.addEventListener('submit', submitProfileChange);
addForm.addEventListener('submit', addPlace);


document.querySelector('.content').addEventListener('click', (evt) => {
  if(evt.target.classList.contains('pop-up__overlay')) {
    hidePopUp(evt.target.closest('.pop-up'));
  }
})
