// Открытие/закрытие форм
let editButton = document.querySelector('.button_type_edit');
let addButton =  document.querySelector('.button_type_add');
let authorCloseButton = document.querySelector('.button_type_author');
let placeCloseButton = document.querySelector('.button_type_place');
let AuthorPopup = document.querySelector('.popup_type_author');
let CardPopup = document.querySelector('.popup_type_card');

function toggleAuthorPopup() {
  AuthorPopup.classList.toggle('popup_opened');
}

function toggleCardPopup() {
  CardPopup.classList.toggle('popup_opened');
}

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
    toggleAuthorPopup()
}

formElement.addEventListener('submit', authorFormSubmitHandler);
