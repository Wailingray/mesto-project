import { togglePopup } from "./modal.js";
import { toggleButtonState } from './validate.js';

/*Функция создания карточек*/
export function createCard(nameValue, imgValue) {
  const imagePopup = document.querySelector(".popup_type_image");
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardContainer = document.querySelector(".cards");
  cardElement.querySelector(".card__image").setAttribute("src", imgValue);
  cardElement.querySelector(".card__title").textContent = nameValue;
  const altName = `Фотография местности: ${nameValue}`;
  cardElement.querySelector(".card__image").setAttribute("alt", altName);

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
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      imagePopup.querySelector(".popup__image").setAttribute("src", imgValue);
      imagePopup.querySelector(".popup__image").setAttribute("alt", altName);
      imagePopup.querySelector(".popup__figcaption").textContent = nameValue;
    });

  /*Добавляем слушатель открытия попапа*/
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      togglePopup(imagePopup);
    });

  /*Вставляем узел карточки в DOM*/
  cardContainer.append(cardElement);
}

/*Функция добавления новой карточки*/
export function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardForm = document.querySelector(".popup_type_card .popup__form");
  const cardPopup = document.querySelector(".popup_type_card");
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
  togglePopup(cardPopup);
}


/*Функция деактивации кнопки попапа карточек*/
export const disableButton = (FormSelector, { buttonSelector, inactiveButtonClass }) => {
  const buttonElement = FormSelector.querySelector(buttonSelector);
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
};
