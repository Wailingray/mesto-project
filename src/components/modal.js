import { imagePopup, cardPopup } from "./card.js";

export const authorPopup = document.querySelector(".popup_type_author");
const popupList = Array.from(document.querySelectorAll(".popup"));
const authorCloseButton = document.querySelector(".button_type_author");
export const avatarPopup = document.querySelector(".popup_type_avatar");
const placeCloseButton = document.querySelector(".button_type_place");
const imageCloseButton = document.querySelector(".button_type_image");
const avatarCloseButton = document.querySelector(".button_type_avatar");

/*Функции открытия/закрытия попапа*/
export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  addClosePopupOnEscListener();
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  removeClosePopupOnEscListener();
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

/*Слушатели на кнопки закрытия попапов */
placeCloseButton.addEventListener("click", function () {
  closePopup(cardPopup);
});

authorCloseButton.addEventListener("click", function () {
  closePopup(authorPopup);
});

avatarCloseButton.addEventListener("click", function () {
  closePopup(avatarPopup);
});

imageCloseButton.addEventListener("click", function () {
  closePopup(imagePopup);
});

/*Слушатели закрытия попапа на оверлее*/
popupList.forEach((element) =>
  element.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(evt.target);
    }
  })
);

export const addClosePopupOnEscListener = () => {
  document.addEventListener("keydown", closePopupOnEsc);
};

export const removeClosePopupOnEscListener = () => {
  document.removeEventListener("keydown", closePopupOnEsc);
};
