import PopupForm from './PopupForm';
import {validationForm} from './functions';
export default class PopupFormEdit extends PopupForm {
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
        const form = event.target;
        this.userName = this.container.querySelector('.popup__input_type_user').value;
        this.jobName = this.container.querySelector('.popup__input_type_job').value;
        obj.editProfileApi(this.userName, this.jobName);
        form.reset();
        obj.getProfileApi();
        validationForm(form.user);
        this.close();
    }
}