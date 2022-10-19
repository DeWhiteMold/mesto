let popUp = document.querySelector('.profile__pop-up');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.profile__close-button');
let saveButton = document.querySelector('.profile__save-button');
let nameInput = document.querySelector('.profile__edit-name');
let descripInput = document.querySelector('.profile__edit-description');
let profileName = document.querySelector('.profile__name');
let profileDecrip = document.querySelector('.profile__description');
let overlay = document.querySelector('.profile__edit-overlay');

editButton.addEventListener('click', switchPopUp);
closeButton.addEventListener('click', switchPopUpNoSave);
saveButton.addEventListener('click', submitInput);
overlay.addEventListener('click', switchPopUpNoSave);


function switchPopUp() {
  popUp.classList.toggle('profile__pop-up');
}

function switchPopUpNoSave() {
  nameInput.value = '';
  descripInput.value = '';
  switchPopUp();
}

function submitInput() {
  if(nameInput.value === '' && descripInput.value === '') {
    switchPopUpNoSave();
  }
  else if(nameInput.value === ''){
    profileDecrip.innerText = descripInput.value;
    descripInput.value = '';
    descripInput.setAttribute('placeholder', profileDecrip.innerText);
    switchPopUp();
  }
  else if(descripInput.value === '') {
    profileName.innerText = nameInput.value;
    nameInput.value = '';
    nameInput.setAttribute('placeholder', profileName.innerText);
    switchPopUp();
  }
  else {
    profileName.innerText = nameInput.value;
    profileDecrip.innerText = descripInput.value;
    nameInput.value = '';
    descripInput.value = '';
    nameInput.setAttribute('placeholder', profileName.innerText);
    descripInput.setAttribute('placeholder', profileDecrip.innerText);
    switchPopUp();
  }
}




