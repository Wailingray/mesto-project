import "./../pages/index.css";
import {
  renderCard,
  cardFormSubmitHandler,
  cardForm,
  cardPopup,
} from "./card.js";
import { openPopup, closePopup, authorPopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { getUserData, getUserCards } from "./api";
const profilePic = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
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
  profileName.textContent = authorNameInput.value;
  jobName.textContent = jobInput.value;
  /*Обновляем value полей ввода*/
  authorNameInput.setAttribute("value", authorNameInput.value);
  jobInput.setAttribute("value", jobInput.value);
  /*Закрываем попап*/
  closePopup(authorPopup);
}

authorFormElement.addEventListener("submit", authorFormSubmitHandler);

/*Обработчик формы*/
cardForm.addEventListener("submit", cardFormSubmitHandler);


/*Отрисовка аватара*/
const renderUserData = () => {
  getUserData()
    .then((data) => {
      profilePic.setAttribute('src', data.avatar);
      profileName.textContent = data.name;
      jobName.textContent = data.about;
    })
};

/*Добавляем начальные карточки*/
const renderUserCards = () => {
  getUserCards()
    .then((cards) => {
      cards.forEach(function (item) {
        renderCard(item.name, item.link, item._id);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


renderUserData();
renderUserCards();

enableValidation({
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__item-error_active",
});
