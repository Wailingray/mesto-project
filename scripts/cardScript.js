/*Функция лайка кароточки*/
let likeButton = document.querySelectorAll('.card__like-button');
for(let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', function () {
    likeButton[i].classList.toggle('card__like-button_active');
  });
}




