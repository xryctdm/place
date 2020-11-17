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
        document.addEventListener('keyup', (event) => {
            if(event.key === 'Escape') {
                this.close();
            }
        });
        this.elem.querySelector('.popup__close').addEventListener('click', () =>{this.close()});
        this.elem.addEventListener('click', (event) =>{
            if (event.target.classList.contains('non-popup')) {
              this.close();
            }
          });
    }
}