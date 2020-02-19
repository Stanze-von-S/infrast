import PopupImage from './PopupImage';

export default class Card {
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
            const formImage = new PopupImage('.popup_image');
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