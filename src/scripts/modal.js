/*Функции открытия/закрытия попапа*/

export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    document.querySelector(".popup_opened").classList.remove("popup_opened");
    removeClosePopupOnEscListener();
  }
}

export const addClosePopupOnEscListener = () => {
  document.addEventListener("keydown", closePopupOnEsc);
};

export const removeClosePopupOnEscListener = () => {
  document.removeEventListener("keydown", closePopupOnEsc);
};
