// Открытие/закрытие форм
const editButton = document.querySelector('.button_type_edit');
const addButton =  document.querySelector('.button_type_add');
const authorCloseButton = document.querySelector('.button_type_author');
const placeCloseButton = document.querySelector('.button_type_place');
const imageCloseButton = document.querySelector('.button_type_image');
const authorPopup = document.querySelector('.popup_type_author');
const cardPopup = document.querySelector('.popup_type_card');
const imagePopup = document.querySelector('.popup_type_image');

/*Функции открытия/закрытия попапа*/
function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

/*Функция открытия попапа изображения*/

function openImagePopup() {
  togglePopup(imagePopup);
}

/*Вешаем обработчики на кнопки попапов*/
imageCloseButton.addEventListener('click', function() {
  togglePopup(imagePopup);
});

editButton.addEventListener('click', function() {
  togglePopup(authorPopup);
});

authorCloseButton.addEventListener('click', function() {
  togglePopup(authorPopup);
});

addButton.addEventListener('click', function() {
  togglePopup(cardPopup);
});

placeCloseButton.addEventListener('click', function() {
  togglePopup(cardPopup);
});

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
    togglePopup(authorPopup);
}

formElement.addEventListener('submit', authorFormSubmitHandler);



