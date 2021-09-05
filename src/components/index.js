import "./../pages/index.css";
import {
  createCard,
  cardFormSubmitHandler,
  imagePopup,
  cardForm,
  cardPopup,
} from "./card.js";
import {
  openPopup,
  closePopup,
  addClosePopupOnEscListener,
  removeClosePopupOnEscListener,
} from "./modal.js";
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
const authorFormElement = authorPopup.querySelector(".popup__form");
const authorNameInput = authorFormElement.elements.userName;
const jobInput = authorFormElement.elements.userJob;
const popupList = Array.from(document.querySelectorAll(".popup"));

/*Вешаем обработчики на кнопки попапов*/
imageCloseButton.addEventListener("click", function () {
  closePopup(imagePopup);
  removeClosePopupOnEscListener();
});

editButton.addEventListener("click", function () {
  openPopup(authorPopup);
  addClosePopupOnEscListener();
});

authorCloseButton.addEventListener("click", function () {
  closePopup(authorPopup);
  removeClosePopupOnEscListener();
});

addButton.addEventListener("click", function () {
  openPopup(cardPopup);
  addClosePopupOnEscListener();
});

placeCloseButton.addEventListener("click", function () {
  closePopup(cardPopup);
  removeClosePopupOnEscListener();
});

// Обработчик «отправки» формы
function authorFormSubmitHandler(evt) {
  evt.preventDefault();

  let profileName = document.querySelector(".profile__name");
  let jobName = document.querySelector(".profile__description");

  profileName.textContent = authorNameInput.value;
  jobName.textContent = jobInput.value;
  /*Обновляем value полей ввода*/
  authorNameInput.setAttribute("value", authorNameInput.value);
  jobInput.setAttribute("value", jobInput.value);
  /*Закрываем попап*/
  closePopup(authorPopup);
  removeClosePopupOnEscListener();
}

authorFormElement.addEventListener("submit", authorFormSubmitHandler);

/*Обработчик формы*/
cardForm.addEventListener("submit", cardFormSubmitHandler);

/*Добавляем начальные 6 карточек*/
initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});

/*Слушатели закрытия попапа на оверлее*/
popupList.forEach((element) =>
  element.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      evt.target.classList.remove("popup_opened");
      removeClosePopupOnEscListener();
    }
  })
);

enableValidation({
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__item-error_active",
});
