import Popup from './Popup';
export default class PopupForm extends Popup {
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