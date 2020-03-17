
export class Popup {
    constructor(elem, openLink) {
        this.elem = elem;
        this.openLink = openLink;

        this.addEvents();
    }

    open(event) { 
        this.elem.classList.add('popup_is-opened');
    }

    close() {
        this.elem.classList.remove('popup_is-opened');
    }

    addEvents() {
        this.openLink.forEach((element) => {
            element.addEventListener('click', (event) =>{this.open(event)});
        });

        this.elem.querySelector('.popup__close').addEventListener('click', () =>{this.close()});
    }
}