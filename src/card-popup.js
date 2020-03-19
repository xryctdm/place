import {Popup} from './popup';
export class CardPopup extends Popup {

    open(event, link) {
     
        if (!event.target.classList.contains('place-card__image')) {
            return;
        }

        super.open();
        document.querySelector('.photo-popup__img').setAttribute('src', link);
    }

    addEvents() {
        this.elem.querySelector('.popup__close').addEventListener('click', () =>{this.close()});
    }
}