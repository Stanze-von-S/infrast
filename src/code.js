import './pages/index.css';
import {Api, configApi} from './js/Api';
import CardList from './js/CardList';
import PopupForm from './js/PopupForm';
import PopupImage from './js/PopupImage';
import {validationForm, getProfile} from './js/functions';
// import {validationInput, validationForm, getProfile} from './js/functions';

// import PopupFormPlace from './js/PopupFormPlace';
// import PopupFormEdit from './js/PopupFormEdit';


  




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
