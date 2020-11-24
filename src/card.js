import { Api } from "./api";

export class Card {
    /**
     * 
     * @param {Api} api 
     * 
     */
    constructor(cardData, popup, api, profile) {
        this.api = api;
        this.likes = cardData.likes;
        this.name = cardData.name;
        this.link = cardData.link;
        this.id = cardData._id;
        this.ownerId = cardData.owner._id;
        this.profile = profile;
        this.popup = popup;
        this.likeListener = this.likeListenerHandler.bind(this);
        this.deleteListener = this.deleteListenerHandler.bind(this);
        this.openListener = this.openListenerHandler.bind(this);
    }

    createWithOwner() {
        this._createBaseCard();
        this._createDeleteIcon();
        this.addEvents();

        return this.placeCard;
    }

    create() {
        this._createBaseCard();
        this.addEvents();
    
        return this.placeCard;
    }

    _createBaseCard() {
        this._createCard();
        this._createImage();
        this._createCardDescription();
        this._createCardName();
        this._createLikeIcon();
        this._createLikeQuantityIcon();

        return this.placeCard;
    }

    _createCard() {
        this.placeCard = document.createElement('div');
        this.placeCard.classList.add('place-card');
        this.placeCard.setAttribute('data-id', this.id);
        this.placeCard.setAttribute('data-owner-id', this.ownerId);

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
        let isLiked = this.likes.find(like => {
            return this.profile._id === like._id;
        })

        if (typeof isLiked !== 'undefined') {
            this.placeCardLikeIcon.classList.add('place-card__like-icon_liked');
        }

        return this;
    }

    _createLikeQuantityIcon() {
        this.placeCardLikeQuantityIcon = document.createElement('div');
        this.placeCardLikeIcon.appendChild(this.placeCardLikeQuantityIcon);
        this.placeCardLikeQuantityIcon.classList.add('place-card__like-quantity');
        this.placeCardLikeQuantityIcon.textContent = `${this.likes.length}`;

        return this;
    }

    like() {
        if (this.placeCardLikeIcon.classList.contains('place-card__like-icon_liked')) {
            this.placeCardLikeIcon.classList.remove('place-card__like-icon_liked');
            this.api.dislikeCard(this.id);
            this.likes.pop();
            this.placeCardLikeQuantityIcon.textContent = `${this.likes.length}`;
        } else {
            this.placeCardLikeIcon.classList.add('place-card__like-icon_liked');
            this.api.likeCard(this.id);
            this.placeCardLikeQuantityIcon.textContent = `${this.likes.push('')}`;
        }
    }

    delete(event) {

        if (event.target.classList.contains('place-card__delete-icon')) {
            this.api.deleteCard(event.target.closest(".place-card").getAttribute('data-id'));
            event.target.closest(".place-card").remove();  
            this.removeEvents();
        }
    }

    openPopup(event) {
        this.popup.open(event, this.link);
    }

    addEvents() {
        this.placeCardLikeIcon.addEventListener('click',this.likeListener);
        if (this.placeCardDeleteIcon) {
            this.placeCardDeleteIcon.addEventListener('click', this.deleteListener);
        }
        this.placeCard.addEventListener('click', this.openListener);
    }

    removeEvents() {
        this.placeCardLikeIcon.removeEventListener('click', this.likeListener);
        if (this.placeCardDeleteIcon) {
            this.placeCardDeleteIcon.removeEventListener('click', this.deleteListener);
        }
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