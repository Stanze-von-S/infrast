// import Card from './Card';
export default class CardList {
    constructor(container, cardTemplate) {
        this.container = container;
        this.cardTemplate = cardTemplate;
    }

    addCard(card, id) {
        
        this.cardElement = this.cardTemplate.create(card, id);
        
        this.container.insertAdjacentHTML('beforeend', this.cardElement); 
    }

    render(array, id) {

        array.forEach( el => this.addCard(el, id) );
        
    }        
    
}