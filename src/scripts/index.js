import './../pages/index.css';
import { createCard, cardFormSubmitHandler, disableButton } from "./card.js";
import { togglePopup } from "./modal.js";
import { enableValidation } from "./validate.js";


//Массив карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Переменные
const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const authorCloseButton = document.querySelector(".button_type_author");
const placeCloseButton = document.querySelector(".button_type_place");
const imageCloseButton = document.querySelector(".button_type_image");
const authorPopup = document.querySelector(".popup_type_author");
const imagePopup = document.querySelector(".popup_type_image");
const cardForm = document.querySelector(".popup_type_card .popup__form");
const cardPopup = document.querySelector(".popup_type_card");
const popupList = document.querySelectorAll(".popup");
const formElement = authorPopup.querySelector(".popup__form");
const authorNameInput = formElement.elements.userName;
const jobInput = formElement.elements.userJob;

/*Вешаем обработчики на кнопки попапов*/
imageCloseButton.addEventListener("click", function () {
  togglePopup(imagePopup);
});

editButton.addEventListener("click", function () {
  togglePopup(authorPopup);
});

authorCloseButton.addEventListener("click", function () {
  togglePopup(authorPopup);
});

addButton.addEventListener("click", function () {
  togglePopup(cardPopup);
});

placeCloseButton.addEventListener("click", function () {
  togglePopup(cardPopup);
});

// Обработчик «отправки» формы
function authorFormSubmitHandler(evt) {
  evt.preventDefault();

  let profileName = document.querySelector(".profile__name");
  let jobName = document.querySelector(".profile__description");

  profileName.textContent = authorNameInput.value;
  jobName.textContent = jobInput.value;
  /*Обновляем value полей ввода*/
  authorNameInput.setAttribute('value', authorNameInput.value);
  jobInput.setAttribute('value', jobInput.value);
  /*Закрываем попап*/
  togglePopup(authorPopup);
}

formElement.addEventListener("submit", authorFormSubmitHandler);

/*Слушатели закрытия попапа на оверлее*/
popupList.forEach(element => element.addEventListener("mousedown", evt => {
  if (evt.target.classList.contains("popup_opened")) {
    evt.target.classList.remove("popup_opened");
  }
}));

/*Слушатель закрытия попапа при нажатии esc */
document.addEventListener("keydown", function(evt) {
  if(evt.key === "Escape") {
    document.querySelector(".popup_opened").classList.remove("popup_opened");
  }
});


/*Обработчик формы*/
cardForm.addEventListener("submit", cardFormSubmitHandler);

/*Добавляем начальные 6 карточек*/
initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});


enableValidation({
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__item-error_active",
});
