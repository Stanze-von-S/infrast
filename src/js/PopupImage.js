import Popup from './Popup';
export default class PopupImage extends Popup{
    constructor(selector){
        super(selector);     
    }

    getImage(styleImage){
    const image = this.container.querySelector('.mod');
    image.setAttribute('src', styleImage);
    }
}