const cardContainer = document.querySelector('.cards');

/*Функция создания карточек*/
function createCard(nameValue, imgValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = imgValue;
  cardElement.querySelector('.card__title').textContent = nameValue;
  cardContainer.append(cardElement);
}

/*Функция лайка кароточки*/
function renderLikeButtons() {
  let likeButton = document.querySelectorAll('.card__like-button');
  for(let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener('click', function () {
      likeButton[i].classList.toggle('card__like-button_active');
    });
  }
}

/*Функция добавления новой карточки*/
const cardForm = document.querySelector('.popup_type_card .popup__form');
const placeNameInput = cardForm.querySelector('#name');
const picInput = cardForm.querySelector('#picture');

function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  let cardName = placeNameInput.value;
  let cardLink = picInput.value;
  placeNameInput.value = '';
  picInput.value = '';
  createCard(cardName,cardLink);
}

cardForm.addEventListener('submit',cardFormSubmitHandler);

/*Добавляем начальные 6 карточек*/
createCard('Челябинская область','https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
createCard('Архыз','https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
createCard('Иваново','https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
createCard('Камчатка','https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
createCard('Холмогорский район','https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
createCard('Байкал','https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');

renderLikeButtons();
  /*likeButton.addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_active');
});*/




