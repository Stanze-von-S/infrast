import Card from './Card';
export default class CardList {
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
        
    }
}