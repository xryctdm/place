
export class CardList {

    constructor(containerClass, viewCardPopup, createCardHandler) {
        this.containerClass = containerClass;
        this.createCardHandler = createCardHandler;
        this.viewCardPopup = viewCardPopup;
    }

    render(cardData) {
        for (let i = 0; i < cardData.length; i++) {
            this.containerClass.appendChild(this.onCreateCardHandler(cardData[i]));
        }
    }

    addCard(card) {
        this.containerClass.appendChild(card);
    }

    onCreateCardHandler(data) {
        return this.createCardHandler(data, this.viewCardPopup);
    }
}