const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.pop-up__input_type_name');
const descriptionInput = document.querySelector('.pop-up__input_type_description');

const formEdit = document.querySelector('.pop-up__form_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popUpEdit = document.querySelector('.pop-up_edit-profile');
const popUpAdd = document.querySelector('.pop-up_add-place');

const photoInput = document.querySelector('.pop-up__input_type_place-image');
const placeNameInput = document.querySelector('.pop-up__input_type_place-name');
const gallery = document.querySelector('.gallery__table');
const formAdd = document.querySelector('.pop-up__form_type_add');
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
    popup.classList.add('pop-up_opend');

    if(popup.querySelector('.pop-up__save-button')) {
      const saveButton = popup.querySelector('.pop-up__save-button');
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add(`${settings.inactiveButtonClass}`);
    }

    document.addEventListener('keydown', setKeyHandler);
}

buttonEdit.addEventListener('click', function() {

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopUp(popUpEdit);
});

buttonAdd.addEventListener('click', function() {
  openPopUp(popUpAdd);
  formAdd.addEventListener('submit', addPlace);
});

const allCloseButtons = document.querySelectorAll('.pop-up__close-button');

function hidePopUp(popup) {
  popup.classList.add('pop-up_visability');
  popup.classList.remove('pop-up_opend');
  document.removeEventListener('keydown', setKeyHandler);
}

allCloseButtons.forEach(function(button){
  button.addEventListener('click', function() {
    hidePopUp(button.closest('.pop-up'));
  })
})

function setKeyHandler(evt) {
  if(evt.key === 'Escape') {
    hidePopUp(document.querySelector('.pop-up_opend'));
  }
}


function submitProfileChange (evt) {
  evt.preventDefault();

  profileName.innerText = nameInput.value;
  profileDescription.innerText = descriptionInput.value;

  hidePopUp(popUpEdit);}

function createCard(name, photo) {
  const userPlace = placeTamplate.querySelector('.place').cloneNode(true);

  const placePhoto = userPlace.querySelector('.place__photo')
  userPlace.querySelector('.place__name').textContent = name;
  placePhoto.src = photo;
  placePhoto.alt = `${name} фото`;

  placePhoto.addEventListener('click', (evt) => {
    openPopUp(photoPopUp);
    photoPopUpImage.src = evt.target.src;
    photoPopUp.querySelector('.photo-pop-up__description').textContent = evt.target.closest('.place').textContent;
    photoPopUpImage.alt = `${evt.target.closest('.place').textContent} фото`;
  })

  userPlace.querySelector('.place__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like_active');
  });

  userPlace.querySelector('.place__remove').addEventListener('click', (evt) => {
    evt.target.closest('.place').remove();
  });

  return userPlace;
}

function addPlace (evt) {
  evt.preventDefault();

  const userPlace = createCard(placeNameInput.value, photoInput.value);

  gallery.prepend(userPlace);
  formAdd.reset();
  formAdd.removeEventListener('submit', addPlace);
  hidePopUp(popUpAdd)
}

initialCards.forEach(function(place){
  const userPlace = createCard(place.name, place.link);

  gallery.prepend(userPlace);
})

formEdit.addEventListener('submit', submitProfileChange);


document.querySelector('.content').addEventListener('click', (evt) => {
  if(evt.target.classList.contains('pop-up__overlay')) {
    hidePopUp(evt.target.closest('.pop-up'));
  }
})
