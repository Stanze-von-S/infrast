import PopupForm from './PopupForm';
import {validationForm} from './functions';
import CardList from './CardList';
export default class PopupFormPlace extends PopupForm {
    constructor(selector, obj, placesList) {
        super(selector, obj);
        // Надо исправить : Нельзя вызывать или создавать реализацию в конструторе класса
        // Вызывая реализацию в конструторе класса, вы заведомо делаете класс не тестируемым.
        // Такие класс нельзя правильно наследовать, а при вызове класса всегда будет вызываться реализация
        this.form.name.addEventListener('input', () => this.functionInput(event));
        this.form.link.addEventListener('input', () => this.functionInput(event));
        // this.form.name = bind (this);
        // this.form.link = bind (this);
        this.cardList = placesList;
    }

    functionForm(event, obj) {
        event.preventDefault();
        const form = event.target;
        this.cardList.addCard(obj);
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