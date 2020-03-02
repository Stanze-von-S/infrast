'use strict'; 

import './pages/index.css';
import {Api} from './js/Api';
// import Avatar from './js/Avatar'
import Card from './js/Card';
import CardList from './js/CardList';
import PopupFormEdit from './js/PopupFormEdit';
import PopupFormPlace from './js/PopupFormPlace';
import Validation from './js/Validation';
import PopupImage from './js/PopupImage';
import {errorMessages} from './js/error_messages';

// получение форм
const formNew = document.forms.new;
const formProfile = document.forms.edit;
// const formAvatar = document.forms.avatar;

// переменные
const placesList = document.querySelector('.places-list');
const popupPicture = document.querySelector('.popup__picture');
const image = document.querySelector('.popup__image');
const popupProfile = document.forms.edit.parentNode;
const popupAddCard = document.forms.new.parentNode;
// const popupAvatar = document.forms.avatar.parentNode;


// кнопки
const editButton = document.querySelector('.user-info__edit-button');
const addCardButton = document.querySelector('.user-info__button');
// const avatarButton = document.querySelector('.user-info__photo');
const closeProfile = popupProfile.querySelector('.popup__close');
const closeNew = popupAddCard.querySelector('.popup__close');
const closePicture = popupPicture.querySelector('.popup__close');
// const closeAvatar = popupAvatar.querySelector('.popup__close');

const serverUrl = 'https://praktikum.tk/cohort4';

// экземпляры классов
const api = new Api({
    baseUrl: serverUrl,
    headers: {
                authorization: 'b79170d1-fa09-48c3-8dc3-1be954624527',
                'Content-Type': 'application/json'
            }
});

const profileValidity = new Validation(formProfile, errorMessages);
const newValidity = new Validation(formNew, errorMessages);
// const avatarValidity = new Validation(formAvatar, errorMessages);
const card = new Card(api);
const cardsGallery = new CardList(placesList, card);
const profile = new PopupFormEdit({
    domElement: formProfile,
    request: api
});
const gallery = new PopupFormPlace({
    domElement: formNew,
    request: api,
    addCards: cardsGallery
});

// const avatar = new Avatar({
//     domElement: formAvatar,
//     request: api
// });
const preview = new PopupImage({
    domElement: popupPicture
});

// обращение к методам классов/загрузка страницы
function loaderPage() {
    api.getPage()
        .then(([user, cards]) => {
            profile.fullfillForm(user.name, user.about);
            cardsGallery.render(cards, user._id);
        })
        .catch(error => alert(error));
}

loaderPage();

// открытие попапов
editButton.addEventListener('click', function() {
    profile.open();
    profileValidity.setEventListeners();
});

addCardButton.addEventListener('click', function() {
    gallery.open();
    newValidity.setEventListeners();
});

// avatarButton.addEventListener('click', function() {
//     avatar.open();
//     avatarValidity.setEventListeners();
// });

placesList.addEventListener('click', (event) => {
    if (event.target.matches('.place-card__image')) {
        preview.open();
        image.src = event.target.dataset.src;
    }
});

// закрытие попапов
closeProfile.addEventListener('click', function() {
    profile.close();
});

closeNew.addEventListener('click', function() {
    gallery.close();
});

// closeAvatar.addEventListener('click', function() {
//     avatar.close();
// });

closePicture.addEventListener('click', function() {
    preview.close();
});

// слушатели форм
formProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    profile.listenForm();
});

formNew.addEventListener('submit', (event) => {
    event.preventDefault();
    gallery.listenForm();
});


// formAvatar.addEventListener('submit', (event) => {
//     event.preventDefault();
//     avatar.listenForm();
// });

// слушатели лайк/удаление
placesList.addEventListener('click', function (event) {
    if (event.target.matches('.place-card__delete-icon')) { 
        if (window.confirm('Разрушать не строить... Всё равно удалим? :(')) {
            card.remove(event);
        } else {
            alert('Отлично! ;)');
        }
    }

    if (event.target.matches('.place-card__like-icon')) {
        card.like(event);
    }
});