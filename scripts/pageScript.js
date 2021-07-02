// Открытие/закрытие форм
const editButton = document.querySelector('.button_type_edit');
const addButton =  document.querySelector('.button_type_add');
const authorCloseButton = document.querySelector('.button_type_author');
const placeCloseButton = document.querySelector('.button_type_place');
const imageCloseButton = document.querySelector('.button_type_place');
const authorPopup = document.querySelector('.popup_type_author');
const cardPopup = document.querySelector('.popup_type_card');
const imagePopup = document.querySelector('.popup_type_image');

/*Функции открытия закрытия попапов*/
function toggleAuthorPopup() {
  authorPopup.classList.toggle('popup_opened');
}

function toggleCardPopup() {
  cardPopup.classList.toggle('popup_opened');
}

function toggleImagePopup() {
  imagePopup.classList.toggle('popup_opened');
}

/*Вешаем обработчики на кнопки попапов*/
imageCloseButton.addEventListener('click',toggleImagePopup);
editButton.addEventListener('click', toggleAuthorPopup);
authorCloseButton.addEventListener('click', toggleAuthorPopup);
addButton.addEventListener('click', toggleCardPopup);
placeCloseButton.addEventListener('click', toggleCardPopup);

//Submit
// Находим форму в DOM
const formElement = document.querySelector('.popup_type_author .popup__form');
// Находим поля формы в DOM
const authorNameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#passion');

// Обработчик «отправки» формы
function authorFormSubmitHandler (evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    let authorNameValue = authorNameInput.value;
    let authorJobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let jobName = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = authorNameValue;
    jobName.textContent = authorJobValue;
    toggleAuthorPopup();
}

formElement.addEventListener('submit', authorFormSubmitHandler);

/*Функция открытия попапа изображения*/

function openImagePopup(evt) {
  const eventTarget = evt.target;
  imagePopup.src = eventTarget.src;
  imagePopup.figcaption.textContent =  eventTarget.textContent;
  imagePopup.classList.toggle('popup_opened');
}
