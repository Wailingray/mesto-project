
import "./../pages/index.css";
import {
  renderCard,
  cardFormSubmitHandler,
  cardForm,
  cardPopup,
  createCard
} from "./card.js";
import { openPopup, closePopup, authorPopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { getUserData, getUserCards, patchUserInfo, apiConfig } from "./api";
const profilePic = document.querySelector(".profile__avatar");
export const profileName = document.querySelector(".profile__name");
const jobName = document.querySelector(".profile__description");
const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const authorFormElement = authorPopup.querySelector(".popup__form");
const authorNameInput = authorFormElement.elements.userName;
const jobInput = authorFormElement.elements.userJob;

editButton.addEventListener("click", function () {
  openPopup(authorPopup);
});

addButton.addEventListener("click", function () {
  openPopup(cardPopup);
});

// Обработчик «отправки» формы
function authorFormSubmitHandler(evt) {
  evt.preventDefault();
  patchUserInfo(authorNameInput.value, jobInput.value)
    .then((userObj) => {
      profileName.textContent = userObj.name;
      jobName.textContent = userObj.about;
      renderUserCards(); //обновляем имя автора карточек на всех его карточках
    })
    .catch((err) => {
      console.log(err);
    });
  /*Обновляем value полей ввода*/
  authorNameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", jobName.textContent);
  /*Закрываем попап*/
  closePopup(authorPopup);
}

authorFormElement.addEventListener("submit", authorFormSubmitHandler);

/*Обработчик формы*/
cardForm.addEventListener("submit", cardFormSubmitHandler);

/*Отрисовка аватара*/
export const renderUserData = () => {
  getUserData().then((data) => {
    profilePic.setAttribute("src", data.avatar);
    profileName.textContent = data.name;
    profileName.setAttribute("id", data._id);
    jobName.textContent = data.about;
    authorNameInput.setAttribute("value", data.name);
    jobInput.setAttribute("value", data.about);
  });
};

/*Обновление данных профиля*/
/* const updateUserInfo = ()
export function createCard(
  nameValue, imgValue, idValue
  , user_idValue, owner_idValue, numOfLikes,  ) {
 */

/*Добавляем начальные карточки*/
export const renderUserCards = () => {
  getUserCards()
    .then((cards) => {
      cards.forEach(function (item) {
        renderCard(
          createCard(
            item.name,
            item.link,
            item._id,
            profileName.id,
            item.owner._id,
            item.likes.length
          )
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

renderUserCards();
renderUserData();

enableValidation({
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__item-error_active",
});
