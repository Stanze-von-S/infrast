import PopupForm from './PopupForm';
import Api from './Api';
export default class PopupFormPlace extends PopupForm {
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