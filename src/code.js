import "./pages/index.css";
// import {configApi, Api} from './js/Api';
// import {Card} from './src/js/Card';
// import CardList from './js/CardList';
// import {validationInput, validationForm, getProfile} from './js/functions';
// import {Popup} from './js/Popup';
// import PopupForm from './js/PopupForm';
// import PopupImage from './js/PopupImage';
// import PopupFormPlace from './js/PopupFormPlace';
// import PopupFormEdit from './js/PopupFormEdit';
// import './pages/index.css';
const configApi = {
    baseUrl: 'https://praktikum.tk/cohort4',
    headers: {
        authorization: 'b79170d1-fa09-48c3-8dc3-1be954624527',
        'Content-Type': 'application/json'
    }
};

class Api {
    constructor(configApi) {
        this.container = configApi;
    }

    fetchCardRenderApi() {
        const arrCard = [this.container.baseUrl, '/cards'];
        const varCard = arrCard.join('');
        return fetch(varCard, {
            method: 'GET',
            headers: this.container.headers
        })
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                return Promise.reject('Error');                
            })
            .then(res => {
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getProfileApi() {
        // Мы получаем профиль
        const arrUser = [this.container.baseUrl, '/users/me'];
        const varUser = arrUser.join('');
        return fetch(varUser, {
          method: 'GET',
          headers: this.container.headers
        })
          .then(data => {
            if (data.ok) { return data.json(); }
            return Promise.reject('Error');
          })
          .catch((err) => {
            console.log(err)
          });
      }
       
      editProfileApi(nameUser, aboutUser) {
        // Мы редактируем профиль
        const arrUser = [this.container.baseUrl, '/users/me'];
        const varUser = arrUser.join('');
        return fetch(varUser, {
          method: 'PATCH',
          headers: this.container.headers,
          body: JSON.stringify({
            name: nameUser,
            about: aboutUser
          })
        })
          .catch((err) => {
            console.log(err.status);
          });
      }
}
function validationInput(variable) {
    if ((variable.validity.tooShort) ||
      (variable.validity.tooLong)) {
      variable.nextElementSibling.textContent = validationErrorLenght;
      return false;
    } else if ((variable.value === '') ||
      (variable.value === null) || (variable.value === undefined)) {
      variable.nextElementSibling.textContent = validationError;
      return false;
    } else {
      variable.nextElementSibling.textContent = '';
      return true;
    }
  }
  
  function validationForm(variable) {
    const form = variable.parentNode;
    const button = form.lastElementChild;
    const variable1 = form.firstElementChild;
    const variable2 = variable1.nextElementSibling.nextElementSibling;
  
    if ((validation(variable1)) && (validation(variable2))) {
      button.classList.add('popup__button_active');
    } else {
      button.classList.remove('popup__button_active');
    }
  
  }
  
  function validation(variable) {
    /* Можно лучше: удалите else а внутри условия добавьте return
     например было: 
     if(условие){  
       // ваш код 
     } else if(условие2){ 
       // ваш код 
     } 
     стало : 
     if(условие){  
         // ваш код 
      return; 
    } 
   
     if(условие2){ 
      // ваш код 
      return; 
    } 
   
  */
    if ((variable.validity.tooShort) ||
      (variable.validity.tooLong)) {
      return false;
    } else if ((variable.value === '') ||
      (variable.value === null) || (variable.value === undefined)) {
      return false;
    } else {
      return true;
    }
  }
  
  function getProfile(api, name, about, image) {
    return api.getProfileApi()
            .then((res) =>{
              name.textContent = res.name;
              about.textContent = res.about;
              image.style.backgroundImage =  `url(${res.avatar})`;
            })
  }
  class Card {
    constructor(name, link, obj) {
        this.name = name;
        this.link = link;
        this.api = obj;
        // Надо исправить : Нельзя вызывать или создавать реализацию в конструторе класса
        // Вызывая реализацию в конструторе класса, вы заведомо делаете класс не тестируемым.
        // Такие класс нельзя правильно наследовать, а при вызове класса всегда будет вызываться реализация
        this.element = this.create();
        this.element.addEventListener('click', () => this.functionEvent(event));
    }

    functionEvent(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            this.like(event);
        }
        if (event.target.classList.contains('place-card__delete-icon')) {
            this.remove(event);
        }
        if (event.target.classList.contains('place-card__image')) {
            const image = this.takeImage();
            formImage.getImage(image);
            formImage.open();
        }

    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event) {
        event.currentTarget.remove();
    }

    create() {
        const placeCard = document.createElement("div");
        placeCard.classList.add("place-card");
        placeCard.innerHTML = `
            <div class="place-card__image">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <button class="place-card__like-icon"></button>
            </div>`;
        placeCard.querySelector(".place-card__name").textContent = this.name;
        placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;

        return placeCard;
    }

    takeImage() {
        const image = this.element.querySelector('.place-card__image');
        const style = image.getAttribute('style');
        const arr = style.split('(');
        const arrMod = arr[1].split(')');
        const mod = arrMod[0].split(`"`);
        const stringArr = mod[1].toString();
        return stringArr;
    }

}
class CardList {
    constructor(selector, api) {
        this.container = document.querySelector(selector);
        this.list = [];
        this.apiVar = api;
    }

    addCard(apiObj) {
        const place = new Card(apiObj.name, apiObj.link, apiObj);
        this.container.appendChild(place.element);
        this.list.push(place);
    }

    render() {
        this.apiVar.fetchCardRenderApi()
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    this.addCard(res[i]);
                }
            });
        /* 
         можно лучше : используйте for of для перебора массива с объектами
         https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of 
         как пример:
         
         const array1 = ['a', 'b', 'c'];
         for (const element of array1) {
          console.log(element);
         }
         
        */
    }
}
class Popup{
    constructor(selector){
        this.container = document.querySelector(selector);
        this.container.addEventListener('click', () => this.functionPopup(event));
    }

    functionPopup (event){
        if(event.target.classList.contains('popup__close')){
            this.close();
        }
    }
 
    open(){
        this.container.classList.add('popup_is-opened');
    }

    close(){
        this.container.classList.remove('popup_is-opened');
    }
}

class PopupForm extends Popup {
    // переменная objApi ни как не используется
    constructor(selector, obj) {
        super(selector);
        this.form = this.formOpen();
        this.form.addEventListener('submit', () => this.functionForm(event, obj));
        
    }

    functionInput(event) {
        validationInput(event.target);
        validationForm(event.target);
    }

    formOpen() {
        return this.container.querySelector(`div.popup__content form.popup__form`);;
    }

} 
class PopupFormEdit extends PopupForm {
    constructor(selector, obj) {
        super(selector, obj);
        // нельзя такое в конструкторе делать, присваивать значения 
        this.container.querySelector('.popup__input_type_user').value = 'Jaques Causteau';
        this.container.querySelector('.popup__input_type_job').value = 'Sailor, Researcher';
        this.container.querySelector('.button_save').classList.add('popup__button_active');
        this.form.user.addEventListener('input', () => this.functionInput(event));
        this.form.job.addEventListener('input', () => this.functionInput(event));
    }

    functionForm(event, obj) {
        event.preventDefault();
        const form = event.target;
        this.userName = this.container.querySelector('.popup__input_type_user').value;
        this.jobName = this.container.querySelector('.popup__input_type_job').value;
        obj.editProfileApi(this.userName, this.jobName);
        profileName.textContent = this.userName;
        profileJob.textContent = this.jobName;
        form.reset();
        validationForm(form.user);
        this.close();
    }

}

class PopupFormPlace extends PopupForm {
    constructor(selector, obj) {
        super(selector, obj);
        // Надо исправить : Нельзя вызывать или создавать реализацию в конструторе класса
        // Вызывая реализацию в конструторе класса, вы заведомо делаете класс не тестируемым.
        // Такие класс нельзя правильно наследовать, а при вызове класса всегда будет вызываться реализация
        this.form.name.addEventListener('input', () => this.functionInput(event));
        this.form.link.addEventListener('input', () => this.functionInput(event));
    }

    functionForm(event, obj) {
        event.preventDefault();
        const form = event.target;
        placesList.addCard(obj);
        form.reset();
        validationForm(form.name);
        this.close();
    }

    getName() {
        return this.form.name.value;
    }

    getLink() {
        return this.form.link.value;
    }
}

class PopupImage extends Popup{
    constructor(selector){
        super(selector);     
    }

    getImage(styleImage){
    const image = this.container.querySelector('.mod');
    image.setAttribute('src', styleImage);
    }
}

const objectApi = new Api(configApi);
const addFormButton = document.querySelector('.user-info__button');
const addFormUserButton = document.querySelector('.user-info__button-edit');
const placePopup = new PopupFormPlace('.popup_new-place', objectApi);
const jobPopup = new PopupFormEdit('.popup_new-form', objectApi);
const profileName = document.querySelector('.user-info__name');
const profileJob = document.querySelector('.user-info__job');
const profileImage = document.querySelector('.user-info__photo');
const placesList = new CardList('.places-list', objectApi);
// Принимаем данные от сервера по профилю.
getProfile(objectApi, profileName, profileJob, profileImage);
// Выгружаем карточки с сервера.
placesList.render();

const formImage = new PopupImage('.popup_image');

addFormButton.addEventListener('click', function (event) {
    placePopup.open();
})

addFormUserButton.addEventListener('click', function (event) {
    jobPopup.open();
})
