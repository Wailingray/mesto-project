import "./../pages/index.css";
import {
  renderCard,
  cardFormSubmitHandler,
  cardForm,
  cardPopup,
  createCard,
  renderLikes,
} from "./card.js";
import { openPopup, closePopup, authorPopup, avatarPopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { getUserData, getUserCards, patchUserInfo, patchAvatar } from "./api";
import { setButtonState } from "./utils";

const profilePic = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
const jobName = document.querySelector(".profile__description");
const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const avatarEditButton = document.querySelector(".profile__avatar-button");
const authorFormElement = authorPopup.querySelector(".popup__form");
const avatarFormElement = avatarPopup.querySelector(".popup__form");
const authorNameInput = authorFormElement.elements.userName;
const jobInput = authorFormElement.elements.userJob;
const avatarUrlInput = avatarFormElement.elements.avatarPicture;
const avatarUrl = document.querySelector(".profile__avatar");
const authorSubmitButton = authorFormElement.querySelector(".popup__button");
const avatarSubmitButton = avatarFormElement.querySelector(".popup__button");

editButton.addEventListener("click", function () {
  openPopup(authorPopup);
});

avatarEditButton.addEventListener("click", function () {
  openPopup(avatarPopup);
});

addButton.addEventListener("click", function () {
  openPopup(cardPopup);
});

function authorFormSubmitHandler(evt) {
  evt.preventDefault();
  setButtonState(authorSubmitButton, true);
  patchUserInfo(authorNameInput.value, jobInput.value)
    .then((userObj) => {
      profileName.textContent = userObj.name;
      jobName.textContent = userObj.about;
      authorNameInput.value = profileName.textContent;
      jobInput.value = jobName.textContent;
      closePopup(authorPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonState(authorSubmitButton, false);
    });
}

function avatarFormSubmitHandler(evt) {
  evt.preventDefault();
  setButtonState(avatarSubmitButton, true);
  patchAvatar(avatarUrlInput.value)
    .then((userObj) => {
      avatarUrl.setAttribute("src", userObj.avatar);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonState(avatarSubmitButton, false);
    });
}

authorFormElement.addEventListener("submit", authorFormSubmitHandler);

cardForm.addEventListener("submit", cardFormSubmitHandler);

avatarFormElement.addEventListener("submit", avatarFormSubmitHandler);

const setUserAttributes = (data) => {
  profilePic.setAttribute("src", data.avatar);
  profileName.textContent = data.name;
  jobName.textContent = data.about;
  authorNameInput.setAttribute("value", data.name);
  jobInput.setAttribute("value", data.about);
};

/*Начальный промис*/
Promise.all([getUserData(), getUserCards()]).then(([data, cards]) => {
    setUserAttributes(data);
    cards.reverse().forEach(function (item) {
      renderCard(renderLikes(data._id, item.likes, createCard(item, data._id)));
    })
  })
  .catch((err) => {
    console.log(err);
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
