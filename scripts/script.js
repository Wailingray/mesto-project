let editButton = document.querySelector('.button_type_edit');
let addButton =  document.querySelector('.button_type_add');
let authorCloseButton = document.querySelector('.button_type_author');
let placeCloseButton = document.querySelector('.button_type_place');
let AuthorPopup = document.querySelector('.popup_type_author');
let CardPopup = document.querySelector('.popup_type_card');

function toggleAuthorPopup() {
  AuthorPopup.classList.toggle('popup_opened');
}

function toggleCardPopup() {
  CardPopup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', toggleAuthorPopup);
authorCloseButton.addEventListener('click', toggleAuthorPopup);
addButton.addEventListener('click', toggleCardPopup);
placeCloseButton.addEventListener('click', toggleCardPopup);

