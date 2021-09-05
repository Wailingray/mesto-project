import {
  openPopup,
  closePopup,
  addClosePopupOnEscListener,
  removeClosePopupOnEscListener,
} from "./modal.js";
import { toggleButtonState } from "./utils.js";

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const cardForm = document.querySelector(".popup_type_card .popup__form");
const cardPopup = document.querySelector(".popup_type_card");

/*Функция создания карточек*/
function createCard(nameValue, imgValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardContainer = document.querySelector(".cards");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", imgValue);
  cardElement.querySelector(".card__title").textContent = nameValue;
  const altName = `Фотография местности: ${nameValue}`;
  cardImage.setAttribute("alt", altName);

  /*Добавляем слушатель удаления карточки*/
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      eventTarget.closest(".card").remove();
    });

  /*Добавляем слушатель лайка*/
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("card__like-button_active");
    });

  /*Добавляем слушатель копирования содержания карточки в попап*/
  cardImage.addEventListener("click", function () {
    popupImage.setAttribute("src", imgValue);
    popupImage.setAttribute("alt", altName);
    imagePopup.querySelector(".popup__figcaption").textContent = nameValue;
  });

  /*Добавляем слушатель открытия попапа*/
  cardImage.addEventListener("click", function () {
    openPopup(imagePopup);
    addClosePopupOnEscListener();
  });

  /*Вставляем узел карточки в DOM*/
  cardContainer.append(cardElement);
}

/*Функция добавления новой карточки*/
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardInputs = Array.from(cardForm.querySelectorAll(".popup__item"));
  const cardButton = cardForm.querySelector(".popup__button");
  const placeNameInput = cardForm.querySelector("#placeName-input");
  const picInput = cardForm.querySelector("#url-input");
  const cardName = placeNameInput.value;
  const cardLink = picInput.value;
  cardForm.reset();
  createCard(cardName, cardLink);
  /*Делаем кнопку неактивной*/

  toggleButtonState(cardInputs, cardButton, {
    inactiveButtonClass: "popup__button_disabled",
  });

  /*Закрываем попап*/
  closePopup(cardPopup);
  removeClosePopupOnEscListener();
}

export { imagePopup, cardForm, cardPopup, createCard, cardFormSubmitHandler };
