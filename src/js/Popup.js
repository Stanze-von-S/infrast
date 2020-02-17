export default class Popup{
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