import { openPopup, closePopup } from "./modal.js";
import { toggleButtonState } from "./utils.js";
import { addCard, deleteCard } from "./api.js";
import { profileName, renderUserData } from "./index.js";
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
export function createCard(
  nameValue,
  imgValue,
  idValue,
  user_idValue,
  owner_idValue,
  numOfLikes
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likesCount = cardElement.querySelector(".card__like-counter");
  cardElement.setAttribute("id", idValue);
  cardImage.setAttribute("src", imgValue);
  cardElement.querySelector(".card__title").textContent = nameValue;
  likesCount.textContent = numOfLikes;
  const altName = `Фотография местности: ${nameValue}`;
  cardImage.setAttribute("alt", altName);

  /*Добавляем слушатель удаления карточки*/

  if (checkDeleteAbility(user_idValue, owner_idValue)) {
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
      renderCard(
        createCard(
          cardObj.name,
          cardObj.link,
          cardObj._id,
          profileName.id,
          cardObj.owner._id,
          cardObj.likes.length
        )
      );
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
