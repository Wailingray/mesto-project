import { openPopup, closePopup } from "./modal.js";
import { toggleButtonState, setButtonState } from "./utils.js";
import { addCard, deleteCard, putLike, removeLike } from "./api.js";
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const cardForm = document.querySelector(".popup_type_card .popup__form");
const cardPopup = document.querySelector(".popup_type_card");
const cardButton = cardForm.querySelector(".popup__button");


function removeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".card").remove();
}

function addLike(evt, cardId) {
  const eventTarget = evt.target;
  const thisCard = eventTarget.closest(".card");
  putLike(cardId).then((data) => {
    setLikeClass(eventTarget);
    thisCard.querySelector(".card__like-counter").textContent =
      data.likes.length;
  });
}

function deleteLike(evt, cardId) {
  const eventTarget = evt.target;
  const thisCard = eventTarget.closest(".card");
  removeLike(cardId).then((data) => {
    removeLikeClass(eventTarget);
    thisCard.querySelector(".card__like-counter").textContent =
      data.likes.length;
  });
}

function isLikedByMe (card) {
  const cardLikeButton = card.querySelector(".card__like-button");
  if(cardLikeButton.classList.contains("card__like-button_active")) {
    return true;
  }
  else return false;
}

function toggleLike(evt, cardId) {
  const eventTarget = evt.target;
  const thisCard = eventTarget.closest(".card");
  if(isLikedByMe(thisCard)) {
    deleteLike(evt, cardId)
  }
  else {
    addLike(evt, cardId)
  }
}

function setLikeClass(button) {
  button.classList.add("card__like-button_active");
}

function removeLikeClass(button) {
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
        deleteCard(cardObj._id)
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
  cardLikeButton.addEventListener("click", function (evt) {
    toggleLike(evt, cardObj._id);
  });

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
  setButtonState(cardButton, true)
  evt.preventDefault();
  const cardInputs = Array.from(cardForm.querySelectorAll(".popup__item"));
  const placeNameInput = cardForm.querySelector("#placeName-input");
  const picInput = cardForm.querySelector("#url-input");
  const cardName = placeNameInput.value;
  const cardLink = picInput.value;
  cardForm.reset();
  addCard(cardName, cardLink)
    .then((cardObj) => {
      renderCard(createCard(cardObj, cardObj.owner._id));
      closePopup(cardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonState(cardButton, false);
      toggleButtonState(cardInputs, cardButton, {
        inactiveButtonClass: "popup__button_disabled"
      });
    });
}

export { imagePopup, cardForm, cardPopup, renderCard, cardFormSubmitHandler };
