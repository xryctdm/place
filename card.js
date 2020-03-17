
class Card {
    constructor(cardData, popup) {
        this.name = cardData.name;
        this.link = cardData.link;
        this.popup = popup;

        this.likeListener = this.likeListenerHandler.bind(this);
        this.deleteListener = this.deleteListenerHandler.bind(this);
        this.openListener = this.openListenerHandler.bind(this);
    }

    create() {
        this._createCard()
            ._createImage()
            ._createDeleteIcon()
            ._createCardDescription()
            ._createCardName()
            ._createLikeIcon()
            .addEvents();

        return this.placeCard;
    }

    _createCard() {
        this.placeCard = document.createElement('div');
        this.placeCard.classList.add('place-card');

        return this;
    }

    _createImage() {
        this.placeCardImage = document.createElement('div');
        this.placeCard.appendChild(this.placeCardImage);
        this.placeCardImage.classList.add('place-card__image');
        this.placeCardImage.setAttribute('style', `background-image: url(${this.link})`);

        return this;
    }

    _createDeleteIcon() {
        this.placeCardDeleteIcon = document.createElement('button');
        this.placeCardImage.appendChild(this.placeCardDeleteIcon);
        this.placeCardDeleteIcon.classList.add('place-card__delete-icon');

        return this;
    }

    _createCardDescription() {
        this.placeCardDescription = document.createElement('div');
        this.placeCard.appendChild(this.placeCardDescription);
        this.placeCardDescription.classList.add('place-card__description');

        return this;
    }

    _createCardName() {
        this.placeCardName = document.createElement('h3');
        this.placeCardDescription.appendChild(this.placeCardName);
        this.placeCardName.classList.add('place-card__name');
        this.placeCardName.textContent = `${this.name}`;

        return this;
    }

    _createLikeIcon() {
        this.placeCardLikeIcon = document.createElement('button');
        this.placeCardDescription.appendChild(this.placeCardLikeIcon);
        this.placeCardLikeIcon.classList.add('place-card__like-icon');

        return this;
    }


    like() {
        this.placeCardLikeIcon.classList.toggle('place-card__like-icon_liked');
    }

    delete(event) {

        if (event.target.classList.contains('place-card__delete-icon')) {
            this.removeEvents();
            this.placeCard.remove();
        }
    }

    openPopup(event) {
        this.popup.open(event, this.link);
    }

    addEvents() {
        this.placeCardLikeIcon.addEventListener('click',this.likeListener);
        this.placeCardDeleteIcon.addEventListener('click', this.deleteListener);
        this.placeCard.addEventListener('click', this.openListener);
    }

    removeEvents() {
        this.placeCardLikeIcon.removeEventListener('click', this.likeListener);
        this.placeCardDeleteIcon.removeEventListener('click', this.deleteListener);
        this.placeCard.removeEventListener('click', this.openListener);
    }

    deleteListenerHandler(event) {
        this.delete(event);
    }

    likeListenerHandler() {
        this.like();
    }

    openListenerHandler(event) {
        this.openPopup(event);
    }
}