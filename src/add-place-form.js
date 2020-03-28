
export class AddPlaceForm {

    constructor(selector, popup, cardList, validationMessage, afterSaveHandler) {
        this.popup = popup;
        this.cardList = cardList;
        this.selector = selector;
        this.validationMessage = validationMessage;
        this.afterSaveHandler = afterSaveHandler;
        this.submitButton = document.querySelector('.popup__button');
        this.addEventListener();
    }

    validate() {
        if (this.isValidFields()) {
            this.submitButton.removeAttribute('disabled');
            this.submitButton.classList.add('popup__button_enabled');
        } else {
            this.submitButton.setAttribute('disabled', true);
            this.submitButton.classList.remove('popup__button_enabled');
        }
    }

    isValidFields() {
        return this.getValidateErrorLinkField()===null && this.getValidateErrorPlaceField()===null;
    }

    validatePlaceField() {
        const errorPlace = document.querySelector('#error-place');
        errorPlace.textContent = this.getValidateErrorPlaceField();
    }

    validateLinkField() {
        const errorLink = document.querySelector('#error-link');
        errorLink.textContent = this.getValidateErrorLinkField();
    }


    getValidateErrorPlaceField() {
        const place = document.querySelector('#place');

        if (place.value.length === 0) {
            return this.validationMessage.required;
        } else if (place.value.length < 2 || place.value.length > 30) {
            return this.validationMessage.wrongLength;
        }

        return null;
    }

    getValidateErrorLinkField() {
        const link = document.querySelector('#link');

        if (link.validity.typeMismatch) {
            return this.validationMessage.linkError;
        } else if (link.value.length === 0) {
            return this.validationMessage.required;
        }

        return null;
    }


    save(event) {
        event.preventDefault();
        let addedName = this.selector.elements.name;
        let addedLink = this.selector.elements.link;
        this.afterSaveHandler(addedName.value, addedLink.value).then(result => {
            let addedCard = this.cardList.onCreateCardHandler(result);
            this.cardList.addCard(addedCard);
            this.popup.close();
            document.forms.place.reset();
            this.submitButton.setAttribute('disabled', true);
            this.submitButton.classList.remove('popup__button_enabled');
        })
    }

    addEventListener() {
        this.submitButton.addEventListener('click', (event) =>{this.save(event)});
        this.selector.addEventListener('input', () =>{this.validate()});
        document.querySelector('#place').addEventListener('input', () =>{this.validatePlaceField()});
        document.querySelector('#link').addEventListener('input', () =>{this.validateLinkField()});
    }

    getCardData(addedName, addedLink) {
        return {
            name: addedName.value,
            link: addedLink.value
        };
    }
}