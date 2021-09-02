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

const cardContainer = document.querySelector(".cards");
const cardForm = document.querySelector(".popup_type_card .popup__form");

/*Функция создания карточек*/
function createCard(nameValue, imgValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
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
    .addEventListener("click", openImagePopup);

  /*Вставляем узел карточки в DOM*/
  cardContainer.append(cardElement);
}

/*Функция добавления новой карточки*/
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const placeNameInput = cardForm.querySelector("#placeName-input");
  const picInput = cardForm.querySelector("#url-input");
  const cardName = placeNameInput.value;
  const cardLink = picInput.value;
  cardForm.reset();
  createCard(cardName, cardLink);
  /*Делаем кнопку неактивной*/

 /*  const inputList = Array.from(cardForm.querySelectorAll(".popup__item"));
  const buttonElement = cardForm.querySelector(".popup__button");
  const inactiveButton = cardForm.querySelector(".popup__button_disabled");
  toggleButtonState(inputList, buttonElement, {inactiveButton}); */

  enableValidation({
    formSelector: ".popup__form",
    fieldsetSelector: ".popup__fieldset",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__item-error_active",
  });

  /*Закрываем попап*/
  togglePopup(cardPopup);
}

/*Обработчик формы*/
cardForm.addEventListener("submit", cardFormSubmitHandler);

/*Добавляем начальные 6 карточек*/
initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});
