import { openPopup, closePopup } from "./modal.js";
import { toggleButtonState } from "./utils.js";
import { addCard, deleteCard } from "./api.js";
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const cardForm = document.querySelector(".popup_type_card .popup__form");
const cardPopup = document.querySelector(".popup_type_card");

function removeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".card").remove();
}

function toggleLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("card__like-button_active");
}

/*Функция добавления карточки в DOM*/
function renderCard(nameValue, imgValue, idValue) {
  const cardContainer = document.querySelector(".cards");
  cardContainer.prepend(createCard(nameValue, imgValue, idValue));
}

/*Функция создания карточек*/
function createCard(nameValue, imgValue, idValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.setAttribute("id", idValue);
  cardImage.setAttribute("src", imgValue);
  cardElement.querySelector(".card__title").textContent = nameValue;
  const altName = `Фотография местности: ${nameValue}`;
  cardImage.setAttribute("alt", altName);

  /*Добавляем слушатель удаления карточки*/
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      const currentCardId = evt.target.closest(".card").getAttribute("id");
      deleteCard(currentCardId)
        .then(() => {
          removeCard(evt);
        })
        .catch((err) => {
          console.log(err);
        });
    });

  /*Добавляем слушатель лайка*/
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", toggleLike);

  /*Добавляем слушатель настройки попапа*/
  cardImage.addEventListener("click", function () {
    popupImage.setAttribute("src", imgValue);
    popupImage.setAttribute("alt", altName);
    imagePopup.querySelector(".popup__figcaption").textContent = nameValue;
    openPopup(imagePopup);
  });

  return cardElement;
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
  addCard(cardName, cardLink)
    .then((cardObj) => {
      renderCard(cardObj.name, cardObj.link);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  /*Делаем кнопку неактивной*/

  toggleButtonState(cardInputs, cardButton, {
    inactiveButtonClass: "popup__button_disabled",
  });

  /*Закрываем попап*/
  closePopup(cardPopup);
}

export { imagePopup, cardForm, cardPopup, renderCard, cardFormSubmitHandler };
