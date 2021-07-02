const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardContainer = document.querySelector('.cards');
const cardForm = document.querySelector('.popup_type_card .popup__form');
const placeNameInput = cardForm.querySelector('#name');
const picInput = cardForm.querySelector('#picture');

/*Функция создания карточек*/
function createCard(nameValue, imgValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = imgValue;
  cardElement.querySelector('.card__title').textContent = nameValue;

  /*Добавляем слушатель удаления карточки*/
  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
  });

  /*Добавляем слушатель лайка*/
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_active');
  });

  /*Добавляем слушатель открытия попапа*/
  cardElement.querySelector('.card__image').addEventListener('click', openImagePopup);

  cardContainer.append(cardElement);
}


/*Функция добавления новой карточки*/
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  let cardName = placeNameInput.value;
  let cardLink = picInput.value;
  placeNameInput.value = '';
  picInput.value = '';
  createCard(cardName,cardLink);
  togglePopup(cardPopup);
}

cardForm.addEventListener('submit',cardFormSubmitHandler);

/*Добавляем начальные 6 карточек*/
initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});
