import './pages/index.css';
import {Api, configApi} from './js/Api';
import CardList from './js/CardList';
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

const validationErrorLenght = "Должно быть от 2 до 30 символов";
const validationError = "Это обязательное поле";

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
