let editButton = document.querySelector('.button_type_edit');
let closeButton = document.querySelector('.button_type_close');
let popup = document.querySelector('.popup');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
