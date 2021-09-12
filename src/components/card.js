import { openPopup, closePopup } from "./modal.js";
import { toggleButtonState } from "./utils.js";
import { addCard, deleteCard, putLike, removeLike } from "./api.js";
import { renderUserData } from "./index.js";
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const cardForm = document.querySelector(".popup_type_card .popup__form");
const cardPopup = document.querySelector(".popup_type_card");


function removeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".card").remove();
}

function addLike(evt) {
  const eventTarget = evt.target;
  const thisCard = eventTarget.closest(".card");
  const targetCardId = thisCard.getAttribute("id");
  putLike(targetCardId).then((data) => {
    setLikeClass(eventTarget);
    thisCard.querySelector(".card__like-counter").textContent =
      data.likes.length;
  });
}

function deleteLike(evt) {
  const eventTarget = evt.target;
  const thisCard = eventTarget.closest(".card");
  const targetCardId = thisCard.getAttribute("id");
  removeLike(targetCardId).then((data) => {
    removeLikeClass(eventTarget);
    thisCard.querySelector(".card__like-counter").textContent =
      data.likes.length;
  });
}

function toggleLike() {}

function setLikeClass(button) {
  button.classList.add("card__like-button_active");
}

function removeLikeClass() {
  button.classList.remove("card__like-button_active");
}

/*Проверка состояния лайка*/
function checkLikeState (likesArray, ownerId) {
  return likesArray.some(function(el) {
    return el._id === ownerId;
  });
}

export function renderLikes (userId, likesArray, cardElement) {
  if (checkLikeState(likesArray, userId)) {
    setLikeClass(cardElement.querySelector(".card__like-button"));
  }
  return cardElement;
}


/*Функция добавления карточки в DOM*/
function renderCard(cardElement) {
  const cardContainer = document.querySelector(".cards");
  cardContainer.append(cardElement);
}

/*Функция проверки на возможность удаления карточки*/
function checkDeleteAbility(userId, cardOwnerId) {
  return userId === cardOwnerId;
}

/*Функция удаления кнопки из разметки карточки*/
export function deleteCardButton(cardElement) {
  cardElement.querySelector(".card__delete-button").remove();
  return cardElement;
}

/*Функция создания карточек*/
export function createCard(cardObj, ownerId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likesCount = cardElement.querySelector(".card__like-counter");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardElement.setAttribute("id", cardObj._id);
  cardImage.setAttribute("src", cardObj.link);
  cardElement.querySelector(".card__title").textContent = cardObj.name;

  likesCount.textContent = cardObj.likes.length;
  const altName = `Фотография местности: ${cardObj.name}`;
  cardImage.setAttribute("alt", altName);

  /*Добавляем слушатель удаления карточки*/

  if (checkDeleteAbility(ownerId, cardObj.owner._id)) {
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
  } else {
    cardElement
      .querySelector(".card__delete-button")
      .classList.add("card__delete-button_hidden");
  }

  /*Добавляем слушатели лайка*/
  cardLikeButton.addEventListener("click", addLike);

  /*Добавляем слушатель настройки попапа*/
  cardImage.addEventListener("click", function () {
    popupImage.setAttribute("src", cardObj.link);
    popupImage.setAttribute("alt", altName);
    imagePopup.querySelector(".popup__figcaption").textContent = cardObj.name;
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
      renderCard(createCard(cardObj, profileName));
    })
    .catch((err) => {
      console.log(err);
    });
  /*Делаем кнопку неактивной*/

  toggleButtonState(cardInputs, cardButton, {
    inactiveButtonClass: "popup__button_disabled",
  });
  /*Закрываем попап*/
  closePopup(cardPopup);
}

export { imagePopup, cardForm, cardPopup, renderCard, cardFormSubmitHandler };
