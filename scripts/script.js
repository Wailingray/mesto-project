let editButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');

function open() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', open);
